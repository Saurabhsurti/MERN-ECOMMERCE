import React, {useEffect, useState} from 'react'
import styles from '../../styles/styles';
import ProductCard from '../Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const SuggestedProduct = ({data}) => {
    const {allProducts} = useSelector((state)=>state.products)
    const [productData, setProductData] = useState();

    useEffect(() => {
      const d = allProducts && allProducts.filter((i) => i.category === data.category);
      setProductData(d);
      // eslint-disable-next-line
    }, []);
  return (
    <div>
      {
        data ? (
            <div className={`${styles.section}`}>
                <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                    Related Product
                </h2>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        productData && productData.map((i,index) => (
                            <ProductCard data={i} key={index} />
                        ))
                    }
                </div>
            </div>
        ) : null
      }
    </div>
  )
}

export default SuggestedProduct