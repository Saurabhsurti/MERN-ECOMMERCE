import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { createevent } from '../../redux/actions/event';

const CreateEvent = () => {
  const {seller} = useSelector((state) => state.seller)
  const {  success, error } = useSelector((state) => state.events);
  const  navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [tags,setTags] = useState("");
  const [originalPrice,setOriginalPrice] = useState();
  const [discountPrice,setDiscountPrice] = useState();
  const [stock,setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    setStartDate(startDate)
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10)
  ;}
  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value)
    setEndDate(endDate)
;}

const today = new Date().toISOString().slice(0, 10);

const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10): today;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);


  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image) => {
        newForm.append("images",image);
    });
    newForm.append("name",name);
    newForm.append("description",description);
    newForm.append("category",category);
    newForm.append("tags",tags);
    newForm.append("originalPrice",originalPrice);
    newForm.append("discountPrice",discountPrice);
    newForm.append("stock",stock);
    newForm.append("shopId",seller._id);
    newForm.append("start_Date", startDate.toISOString())
    newForm.append("Finish_Date", endDate.toISOString())
    dispatch(createevent(newForm));
  }

    return (
    <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
        <h5 className='text-[30px] font-Poppins text-center'>create Event</h5>
        {/* create Event form*/}
        <form onSubmit={handleSubmit}>
            <br />
            <div>
                <label className='pb-2'>
                    Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name='name' value={name} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onChange={(e) => setName(e.target.value)} placeholder='Enter your event product name... '/>
            </div>

            <br />
            <div>
                <label className='pb-2'>
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea cols='30' rows='8' required type='text' name='description' value={description} className='mt-2 appearance-none block w-full pt-3 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onChange={(e) => setDescription(e.target.value)} placeholder='Enter your event product description... '></textarea>
            </div>
            
            <br />
            <div>
                <label className='pb-2'>
                    Category <span className="text-red-500">*</span>
                </label>
                <select className='w-full mt-2 border h-[35px] rounded-[5px]' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Choose as category">Choose a category</option>
                    {
                        categoriesData && categoriesData.map((i) => (
                            <option value={i.title} key={i.title}>{i.title}</option>
                        ))
                    }
                </select>
            </div>
            
            <br/>
            <div>
                <label className='pb-2'>
                    Tags <span className="text-red-500">*</span>
                </label>
                <input type="text" name='tags' value={tags} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onChange={(e) => setTags(e.target.value)} placeholder='Enter your event product tags... '/>
            </div>
            <br />
            
            <div>
                <label className='pb-2'>
                    Original Price <span className="text-red-500">*</span>
                </label>
                <input type="number" name='price' value={originalPrice} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onChange={(e) => setOriginalPrice(e.target.value)} placeholder='Enter your event product price... '/>
            </div>
            <br />

            <div>
                <label className='pb-2'>
                    Price (With Discount) <span className="text-red-500">*</span>
                </label>
                <input type="number" name='price' value={discountPrice} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onChange={(e) => setDiscountPrice(e.target.value)} placeholder='Enter your event product price with discount... '/>
            </div>
            <br />

            <div>
                <label className='pb-2'>
                    Product Stock <span className="text-red-500">*</span>
                </label>
                <input type="number" name='stock' value={stock} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' onChange={(e) => setStock(e.target.value)} placeholder='Enter your event product stock... '/>
            </div>
            <br />

            <div>
                <label className='pb-2'>
                    Event Start Date<span className="text-red-500">*</span>
                </label>
                <input type="date" name='startDate' id="start-date" value={startDate ? startDate.toISOString().slice(0,10): ""} onChange={handleStartDateChange} min={today} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product stock... '/>
            </div>
            <br />
            
            <div>
                <label className='pb-2'>
                    Event End Date<span className="text-red-500">*</span>
                </label>
                <input type="date" name='endDate' id="end-date" value={endDate ? endDate.toISOString().slice(0,10): ""} onChange={handleEndDateChange} min={minEndDate} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' placeholder='Enter your event product stock... '/>
            </div>
            <br />
            
            

            <div>
                <label className='pb-2'>
                    Upload Images <span className="text-red-500">*</span>
                </label>
                <input type="file" name="" id="upload" className='hidden' multiple onChange={handleImageChange} />
                <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                        <AiOutlinePlusCircle size={30} className='mt-3 cursor-pointer' color="#555"/>
                    </label>
                    {
                        images && images.map((i) => (
                            <img src={URL.createObjectURL(i)} key={i} alt="Sorry" className='h-[120px] w-[120px] object-cover m-2'></img>
                        ))
                    }
                </div>
                <br />

                <div>
                    <input type="submit" value="Create" className='mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'/>
                </div>
            </div>
        </form>

    </div>
  )
}

export default CreateEvent
