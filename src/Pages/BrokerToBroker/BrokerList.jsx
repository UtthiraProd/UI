import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBrokerToBroker,resetBrokerToBroker } from "../../Features/Slices/brokSlice"
import { setFilter } from "../../Features/Slices/brokSlice"
import { useSearchParams } from "react-router-dom"
import maleavatar from '../../img/Male_avatar.svg'
import { useNavigate } from "react-router-dom"
import { getBrokImageUrl} from "../../Features/Slices/adminBrokerSlice";

export function BrokerToBrokerList(){

    const [searchParams] = useSearchParams()
    const brokerID = searchParams.get('_id')
    // alert(brokerID)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let brokerId = brokerID

    const { isgetBrokerToBrokerLoadin, isgetBrokerToBrokerSuccess, BrokerToBroker,brokImageList } = useSelector((state)=>state.brok)

    //   const{Images} = useSelector ((state)=> state.admin)

    useEffect(()=>{

        dispatch(setFilter())

        if(isgetBrokerToBrokerLoadin ===false && isgetBrokerToBrokerSuccess === false){
            dispatch(getBrokerToBroker())
        }
        if(isgetBrokerToBrokerSuccess===true)
        {
            dispatch(resetBrokerToBroker())
        }
    },[BrokerToBroker,dispatch])


    const ProfileClick = ( brokerID ) =>{
        navigate('/BrokerProfileList?id='+ brokerID)
    }

    return(<>
    <div className="text-success h3 mt-md-2">Brokers</div>

    <div className="container">
    <div className="row row-cols-md-1 row-cols-lg-3 py-5 ">
          {BrokerToBroker.length > 0 ? (
    BrokerToBroker.map((broker)=>(
    <div className="border border-dark rounded m-2" style={{ width: '400px', height: '210px' }}>
        <div key={broker._id} className="" >

    <div className="row" onClick={()=> {ProfileClick(broker._id)}}>
        <div className="col mt-2" style={{width:'150px',height: '190px',display: 'flex',alignItems: 'center',justifyContent: 'center',
                                          overflow: 'hidden'}}>   
         <img style={{height: "150px",width: "150px", borderRadius: '4px'}}

            src={brokImageList.find(item => item._id === broker._id)?.imageBase64 || maleavatar}
            alt="Profile"
          />

        </div>

        <div className="col mt-4">
            <div className="text-success"> <h4>{broker.name}</h4> </div>
            <div className="mt-4">Matrimoni: <b>{broker.matrimonyName}</b></div>
            <div className="mt-3">District: <b>{broker.district}</b></div>
        </div>

    </div>
</div>
</div>
   ))
     ) : (
    <div className="text-center w-100">
      <h5>No broker assigned</h5>
    </div>
  )}
    </div>
    </div>

    </>)
}