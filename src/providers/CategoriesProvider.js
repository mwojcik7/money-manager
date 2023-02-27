import React, { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { theme } from 'assets/styles/theme';

const initialCategoryState = {
  name: '',
  icon: '',
  type: 'expense',
  color: theme.colors.black,
};

const rulesToFields = {
  name: { rules: { required: true }, type: 'text' },
  icon: { rules: { required: true }, type: 'radio' },
  type: { rules: { required: true }, type: 'select' },
  color: { rules: { required: true }, type: 'color' },
};

export const CategoriesContext = createContext({
  categories: [],
  selectedCategory: null,
  setSelectedCategory: () => {},
  initialCategoryState,
  rulesToFields: {},
  errors: {},
  setErrors: () => {},
  validFields: () => {},
});

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchCategories = async () => {
    const querySnapshot = query(collection(db, 'categories'));
    const unsub = onSnapshot(querySnapshot, (newCategories) => {
      const snapshotCategories = newCategories.docs.map((cat) => ({ ...cat.data(), id: cat.id })).sort((a, b) => a.name.localeCompare(b.name));

      setCategories(snapshotCategories);
    });

    return () => unsub();
  };

  const validFields = (fields, isEdit = false) => {
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
    fetchCategories();
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

export default CategoriesProvider;
