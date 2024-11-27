const UserDistributorCard = (props) => {
  return (
    <>
        <div className="grid grid-cols-5 gap-4 p-5">
            <div className="" style={{maxHeight:"100px",}}>
            <img src={props.propic} alt="" className='' style={{width:"100px",maxHeight:"100px",objectFit:"cover",objectPosition:"center"}} onError={(e)=>e.target.src = "https://i.pinimg.com/originals/f2/a3/b9/f2a3b9f1eefe06e590be00dafc6133ac.jpg"}/>
            </div>
            <div className="col-span-4 flex items-center font-semibold text-2xl">{props.name}</div>
        </div>
    </>
  )
}

export default UserDistributorCard