const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[70vh] space-y-3 '>
      <h1 className='font-light text-3xl '>Error 404 | Page Not Found</h1>
      <h2>Click on given link to go <a className='animate-pulse underline' href='/'>Home</a></h2>
    </div>
  )
}

export default NotFound;
