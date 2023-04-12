import { deleteDoc, doc } from 'firebase/firestore';

import { db } from 'firebaseInit/firebase';
import { useError } from 'hooks/useError';

import { CategoryWithIdInterface } from 'providers/CategoriesProvider';
import IconBox from 'components/atoms/IconBox/IconBox';
import ActionsButtons from 'components/molecules/ActionsButtons/ActionsButtons';

import { StyledCategoryItem } from 'components/molecules/CategoriesListItem/CategoriesListItem.styles';

interface PropsInterface {
  category: CategoryWithIdInterface;
  ind: number;
  handleClick: (id: string) => void;
}

const CategoriesListItem = ({ category, ind, handleClick }: PropsInterface) => {
  const { dispatchError } = useError();

  const handleDelete = async (id: string) => {
    try {
      const categoriesRef = doc(db, 'categories', id);
      await deleteDoc(categoriesRef);
    } catch (e) {
      dispatchError('Category not deleted');
    }
  };

  return (
    <StyledCategoryItem data-id={category.id} data-order={ind + 1}>
      <IconBox color={category.color} type="categories" shape="circle" icon={category.icon} />
      <div>{category.name}</div>
      <ActionsButtons handleClick={() => handleClick(category.id)} handleDelete={() => handleDelete(category.id)} />
    </StyledCategoryItem>
  );
};

export default CategoriesListItem;
