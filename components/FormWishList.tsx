import { FC, FormEvent, useCallback, useState } from 'react';

// !!
type FormWishlistProps = {
  onSubmit: (data: WishlistItem) => void;
};
// !!

const FormWishlist: FC<FormWishlistProps> = ({ onSubmit }) => {
  // TODO (1) below
  const [newItemName, setNewItemName] = useState<string>('');

  // ini kan mau dimasukin ke <form onSubmit>, si <form onSubmit kan ngirim event (arahin cursor ke onSubmit, nanti dikasih tau dia ngirim apa)
  // jadi disini dia nerima event itu
  const addItem = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // onSubmit(WishlistItem);
      // gini:
      // onSubmit yang dideklarasiin diatas (baris 5) itu ngirim data yang berupa WishlistItem,
      // Kalo mau tau isi data WishlistItem, arahin aja cursornya ke bagian WishlistItem,
      // caranya ini gimana mas?
      // masih belum nangkep disini mas.
      onSubmit({ name: newItemName });
      setNewItemName('');
    },
    [onSubmit, newItemName]
  );

  return (
    <>
      {/* ini onSubmit-nya ga bisa gini, soalnya onSubmit <form> ga ngirim data yang berupa WishlistItem, makanya kalau diarahin cursornya dia bilang "incompatible"  */}
      {/* jadi harus bikin useCallback buat nerima onSubmit dari <form> */}
      {/* di callback itu, panggil onSubmit yang dikirim component parent kesini */}
      <form onSubmit={addItem} className='flex px-4 py-3 bg-slate-50 border-b'>
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
    </>
  );
};

export default FormWishlist;
