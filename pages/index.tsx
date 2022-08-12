import type { NextPage } from 'next';
import { useState, useCallback, FormEvent } from 'react';

type WishlistItem = {
  name: string;
};

const Home: NextPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');

  const addItem = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (newItemName.trim().length > 0) {
        const nameList = wishlistItems.findIndex(
          (listName) => listName.name === newItemName
        );
        if (nameList === -1) {
          setWishlistItems((current) => [...current, { name: newItemName }]);
          setNewItemName('');
        }
      }
    },
    [newItemName, wishlistItems]
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
          <form
            onSubmit={addItem}
            className='flex px-4 py-3 bg-slate-50 border-b'
          >
            <input
              type='text'
              className='flex-1 bg-transparent focus:outline-none'
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder='Type new stuff...'
            />
            <button type='submit' className='px-3 py-2 bg-slate-300 rounded-lg'>
              Add
            </button>
          </form>
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
