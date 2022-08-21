import type { NextPage } from 'next';
import { useState, useCallback } from 'react';
import FormWishlist from '../components/FormWishList';

type WishlistItem = {
  name: string;
};
const Home: NextPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    { name: 'mbp' },
  ]);
  const addItem = useCallback(
    (data: WishlistItem) => {
      const isEmptyName = data.name.trim().length === 0;
      const isDuplicate =
        wishlistItems.findIndex((item) => data.name === item.name) !== -1;
      if (isEmptyName) {
        alert("Item name can't be empty");
        return false;
      }
      if (isDuplicate) {
        alert(data.name + ' already exist');
        return false;
      }
      setWishlistItems((current) => [...current, { name: data.name }]);
      return true;
    },
    [wishlistItems]
  );

  const deleteItem = (deletingIndex: number) => {
    if (
      window.confirm('Are you sure want to delete this stuff from wishlist?')
    ) {
      setWishlistItems((currentState) =>
        currentState.filter((_item, itemIndex) => itemIndex !== deletingIndex)
      );
    } else {
      console.log('nothing delete');
    }
  };

  return (
    <div className='flex flex-col min-h-screen w-full bg-slate-100 justify-center items-center py-12'>
      <div className='max-w-sm w-[320px] mx-6'>
        <h1 className='text-2xl font-bold text-center mb-3'>My Wishlist</h1>
        <div className='bg-white w-full rounded-xl shadow-xl overflow-hidden shadow-slate-300/50'>
          <FormWishlist onSubmit={addItem} />

          <ul className='w-full'>
            {wishlistItems?.map((listItem, index) => {
              return (
                <li key={index} className='px-4 py-3 border-b flex'>
                  <span className='flex-1'>{listItem.name}</span>
                  <button
                    onClick={() => deleteItem(index)}
                    className='text-red-500'
                  >
                    &times;
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
