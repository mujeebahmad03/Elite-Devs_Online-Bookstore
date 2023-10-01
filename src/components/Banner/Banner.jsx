/* eslint-disable react/prop-types */
import SearchForm from '../SearchForm/SearchForm';
import './Banner.css'


function Banner({pageTitle}) {

  let bannerTitle;

  if(pageTitle  === "Home") bannerTitle = "find your favorite books."
  else bannerTitle = "Browse Our Book Collection"
  
  return (
    <section className='banner'>
        <div className='bannerContent flex flex-c text-center text-white'>
          <h2 className='bannerTitle text-capitalize'>{bannerTitle}</h2><br />
          <p className='bannerText fw-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae sapiente quibusdam consequatur perspiciatis facere laboriosam non nesciunt at id repudiandae, modi iste? Eligendi, rerum!</p>
        <SearchForm/>
        </div>
      </section>
  )
}

export default Banner