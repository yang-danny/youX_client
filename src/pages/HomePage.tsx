import youx1 from "../assets/yp1.jpg"
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-black rounded-lg shadow-md py-8 flex flex-col gap-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
        The future of asset finance is here
        </h1>
        <div className="flex justify-center">
            <img src={youx1} alt="" />
        </div>
    </div>
    </div>
  )
}

export default HomePage
