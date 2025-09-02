import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom' 
import { getMatchProfile, resetgetMatchProfile } from '../../Features/Slices/brokSlice';
import { useNavigate } from 'react-router-dom';
import maleavatar from '../../img/Male_avatar.svg'
import femaleavatar from '../../img/Female_avatar.svg'
import { useState } from "react"

export function MatchProfile() {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const profileId = searchParams.get('id')
    const brokerId = searchParams.get('brokerId')
    const pageIndex = searchParams.get('pageIndex')
    const pageStartIndex = searchParams.get('pageStartIndex')
    const matchPageIndex = searchParams.get('matchPageIndex')
    const matchStartIndex = searchParams.get('matchStartIndex')


     const [currentPage, setCurrentPage] = useState(1);

    const onProfileClick = (id) => {
    navigate('/MatchprofileDetail?id=' + id+ "&profId="+ profileId +'&pageIndex=' + pageIndex + '&pageStartIndex=' + pageStartIndex + "&matchPageIndex=" + currentPage + '&matchStartIndex=' + startPage,);
              dispatch(resetgetMatchProfile())
  }
 
     const backuButtonUrl = () =>{
    navigate('/BrokerProfile?id=' + profileId+ "&name=profileList&pageIndex=" + pageIndex + '&pageStartIndex=' + pageStartIndex)
  }
    const {isgetMatchProfileLoading,isgetMatchProfileSuccess,MatchProfile,matchImageList,totalRecourd} = useSelector((state) =>state.brok);
   
    useEffect(()=>{
            
           if (isgetMatchProfileLoading === false && isgetMatchProfileSuccess === false) {
            
             

               if (matchStartIndex && matchPageIndex) {
                    setStartPage(parseInt(matchStartIndex))
                    setCurrentPage(parseInt(matchPageIndex))
                    onPageChange(parseInt(matchPageIndex))
                  }
                  else {
                    setCurrentPage(1)
                    onPageChange(parseInt(1))
                    dispatch(getMatchProfile({matchProfile:profileId, "skip":currentPage,
                   "pagesize":9}))
                   dispatch(resetgetMatchProfile())
                    // dispatch(searchProfile(searchData))
                  }
               }

    },[isgetMatchProfileLoading,isgetMatchProfileSuccess],dispatch);
    const calculateAge = (dobString) => {
    const today = new Date();
    const dob = new Date(dobString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

    const getProfileImage = (match) => {
    const imageEntry = matchImageList?.find(item => item.profileID === match.profileID);
    if (imageEntry?.imageBase64) return imageEntry.imageBase64;
    return match.sex === 'Male' ? maleavatar : femaleavatar;
  };

   const [startPage, setStartPage] = useState(1);
  
   const handleNext = () => {
    if(totalRecourd)
    {
      if (currentPage <totalRecourd) {
        onPageChange(currentPage + 1);
        if (currentPage >= startPage + 4) {
          setStartPage(startPage + 1);
        }
      }
    }
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
        if (currentPage <= startPage) {
          setStartPage(startPage - 1);
        }
      }
    };

        const onPageChange = (page) => {
         setCurrentPage(page);
    
            dispatch(getMatchProfile({matchProfile:profileId,"skip":page,"pagesize":9}))
       };

    //      useEffect(()=>{
            
    //        if (isgetMatchProfileLoading === false && isgetMatchProfileSuccess === false) {
    //            dispatch(getMatchProfile({matchProfile:profileId, "skip":currentPage,
    //       "pagesize":9}))
    //           dispatch(resetgetMatchProfile())
    //            }
               
    // },[isgetMatchProfileLoading,isgetMatchProfileSuccess],dispatch);

    return(<>
            <div className="dropdown-item d-flex align-items-center" >
          <svg onClick={backuButtonUrl} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1aa179" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <p className="h6 mb-0 ms-2" onClick={backuButtonUrl} style={{ cursor: 'pointer' }}>Go Back</p>
        </div>
        <br />
    <p className='h4'>Matching Profile</p>
<br />

    Page {currentPage} of {totalRecourd}
    <div>

<div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      {Array.from({ length: Math.min(totalRecourd,5) }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <li key={pageNumber} className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                color: currentPage === pageNumber ? 'white' : '#1aa179',
              }}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="page-item" onClick={handleNext} disabled={currentPage ===totalRecourd}>
        <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
</div>


    <div className='container'>
                    
        <div className="container py-0" >
        <div className="row row-cols-1 row-cols-md-4 py-3 ">
        {MatchProfile.map((match, index) =>(
          <div key={index}> 
                        <div className="card"style={{
                          border: '2px solid teal',  // Blue border with 2px width
                          borderRadius: '5px',       // Rounded corners
                          padding: '10px'            // Inner spacing
                        }}>
                          
                        <div className="upper-div" style={{ backgroundColor: '#ffffff' }}>
                        <img className="centered-image" src={getProfileImage(match)} alt="Profile" />
                        </div>
                          <div className="card-body">
                           

                            <a
                              href="#"
                              className="card-text profile-link"
                              style={{
                                backgroundColor: "#ffffff",
                                color: '#1aa179',
                                fontWeight: "bold",
                                fontSize: "20px",
                                textDecoration: 'none',  // Remove underline
                              }}
                            >
                              <div className="profile-wrapper">
                                <span onClick={()=>onProfileClick(match._id)} className="profile-name" title={match.name}>
                                  {match.name}
                                </span>
                                <span className="profile-age ms-1">
                                  {calculateAge(match.DOB)} yr
                                </span>
                              </div>
                            </a>
                            <p className="card-text field" title={`${match.job}, ${match.district}`}>
                              <strong>{match.job}, {match.district}</strong></p>
                          </div>
                        </div>
          </div>
        ))}
         </div>
        </div>
    </div>


    <div>  
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginTop: '20px' }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handlePrevious} disabled={currentPage === 1}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {Array.from({ length: Math.min(totalRecourd, 5) }, (_, index) => {
                  const pageNumber = startPage + index;
                  return (
                    <li key={pageNumber} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => onPageChange(pageNumber)}
                        style={{
                          backgroundColor: currentPage === pageNumber ? '#1aa179' : '#ffffff',
                          color: currentPage === pageNumber ? 'white' : '#1aa179',
                        }}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}

                <li className="page-item" onClick={handleNext} disabled={currentPage === totalRecourd}>
                  <a className="page-link" style={{ backgroundColor: '#ffffff', color: '#1aa179' }} href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
</div>

    </>)
}