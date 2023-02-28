const Post = ({user, content, updatedAt}) => {
  const dateString = updatedAt.substring(0, 10);
  return (
    <div href="#" className="block p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid grid-cols-3 gap-4">
        <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white col-span-2">@{user}</h5>
        <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white col-span-1 text-right">{dateString}</h5>
        
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">{content}</p>
    </div>
  );
}

export default Post;