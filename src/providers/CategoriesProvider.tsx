import { createContext, useEffect, useState, useContext } from 'react';
import { collection, onSnapshot, query, Unsubscribe } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { theme } from 'assets/styles/theme';

export type TypeType = 'income' | 'expense' | 'transfer' | 'other' | null;

export interface CategoryWithoutIdInterface {
  name: string;
  icon: string;
  type: TypeType;
  color: string;
}

export interface CategoryWithIdInterface extends CategoryWithoutIdInterface {
  id: string;
}

interface CategoryRulesInterface {
  [index: string]: {
    rules: { required: boolean },
    type: string,
  };
}

interface ErrorInterface {
  [index: string]: string | null;
}

interface ContextValue {
  categories: CategoryWithIdInterface[];
  selectedCategory: CategoryWithIdInterface | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryWithIdInterface | null>>;
  initialCategoryState: CategoryWithoutIdInterface;
  rulesToFields: CategoryRulesInterface;
  errors: ErrorInterface;
  setErrors: React.Dispatch<React.SetStateAction<ErrorInterface>>;
  validFields: (fields: { [index: string]: string | number | TypeType }, isEdit: boolean) => number;
}

const initialCategoryState: CategoryWithoutIdInterface = {
  name: '',
  icon: '',
  type: 'expense',
  color: theme.colors.black,
};

const rulesToFields: CategoryRulesInterface = {
  name: { rules: { required: true }, type: 'text' },
  icon: { rules: { required: true }, type: 'radio' },
  type: { rules: { required: true }, type: 'select' },
  color: { rules: { required: true }, type: 'color' },
};

export const CategoriesContext = createContext<ContextValue | null>(null);

const CategoriesProvider = ({ children }: React.PropsWithChildren) => {
  const [categories, setCategories] = useState<CategoryWithIdInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithIdInterface | null>(null);
  const [errors, setErrors] = useState<ErrorInterface>({});

  const fetchCategories = (): Unsubscribe => {
    const querySnapshot = query(collection(db, 'categories'));
    const unsub = onSnapshot(querySnapshot, (newCategories) => {
      // eslint-disable-next-line prettier/prettier
      const snapshotCategories: CategoryWithIdInterface[] = newCategories.docs.map((cat) => ({ ...cat.data(), id: cat.id } as CategoryWithIdInterface)).sort((a, b) => a.name.localeCompare(b.name));

      setCategories(snapshotCategories);
    });

    return unsub;
  };

  const validFields = (fields: { [index: string]: string | number | TypeType }, isEdit = false): number => {
    let countError = 0;

    Object.keys(fields).forEach((field) => {
      Object.entries(rulesToFields[field].rules).forEach((rule) => {
        if (rule[0] === 'required' && rule[1] && !fields[field]) {
          let msg = 'You need to ';
          if (rulesToFields[field].type === 'select' || rulesToFields[field].type === 'radio') {
            msg += 'select any option';
          } else {
            msg += `complete the ${field} field`;
          }
          setErrors((prevValue) => {
            prevValue[field] = msg;
            return { ...prevValue };
          });

          countError++;
        } else {
          setErrors((prevValue) => {
            prevValue[field] = null;
            return { ...prevValue };
          });
        }
      });
    });

    if (!isEdit && categories.find((category) => category.name === fields.name)) {
      setErrors((prevValue) => ({ ...prevValue, name: 'Category name already exists' }));

      countError++;
    } else if (!countError) {
      setErrors((prevValue) => ({ ...prevValue, name: null }));
    }

    return countError;
  };

  useEffect(() => {
    const unsub: Unsubscribe = fetchCategories();

    return () => unsub();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        initialCategoryState,
        rulesToFields,
        errors,
        setErrors,
        validFields,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const contextCategories = useContext(CategoriesContext);

  if (!contextCategories) {
    throw new Error('useCategoriesProvider has to be used within <CategoriesContext.Provider>');
  }

  return contextCategories;
};

export default CategoriesProvider;
