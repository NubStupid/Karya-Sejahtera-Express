const Navbar = () => {
  return (
    <>
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 bg-blue-primary p-5 ps-16">
            <div className=""><img src="../../../public/assets/KS.png" alt="" style={{width:"5vw"}}/></div>
            <div className="">b</div>
            <div className="lg:col-span-2">c</div>
            <div className="md:col-span-2 lg:col-span-3">d</div>
        </div>
    </>
  )
}

export default Navbar