import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NumberInput from './NumberInput';
const DistributorProductCard = (props) => {
  return (
    <>
      <div className="border-black border rounded-lg h-[12vh] flex items-center">
        <div className="">
            <div className="grid grid-cols-5 gap-4 px-5 pt-2">
                <div className="flex items-center" style={{maxHeight:"100px",}}>
                <img src={props.img} alt="" className='' style={{width:"100px",maxHeight:"100px",objectFit:"cover",objectPosition:"center"}} onError={(e)=>e.target.src = "https://static.vecteezy.com/system/resources/previews/002/761/708/non_2x/krupuk-icon-doodle-hand-drawn-or-outline-icon-style-vector.jpg"}/>
                </div>
                <div className="col-span-2 flex items-center font-semibold text-sm">{props.productName}</div>
                <div className="col-span-2 flex items-center">
                  <div className="grid grid-cols-3 w-100 ">
                    <div className="flex justify-center"><RemoveIcon onClick={()=>props.handleCart(props.productDId,Number.parseInt(props.qty)-1 >=0? Number.parseInt(props.qty)-1:0,{
                      productName:props.productName,
                      img:props.img,
                      price:props.price,
                      username:props.username
                    })}/></div>
                    <div className="flex justify-center">
                      {/* <input type="number" name="" id="" className='text-center' style={{maxWidth:"100%"}} min={0} value={props.qty?props.qty:0}/> */}
                      <NumberInput qty={props.qty} handleCart={props.handleCart} id={props.productDId} payload={{
                      productName:props.productName,
                      img:props.img,
                      price:props.price,
                      username:props.username
                    }}/>
                    </div>
                    <div className="flex justify-center" onClick={()=>props.handleCart(props.productDId,Number.parseInt(props.qty)+1,{
                      productName:props.productName,
                      img:props.img,
                      price:props.price,
                      username:props.username
                    })}><AddIcon/></div>
                  </div>
                </div>
            </div>
            <div className="px-5 py-2">
              <div className="text-sm font-semibold text-green-600">
                Price: Rp. {props.price}
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DistributorProductCard