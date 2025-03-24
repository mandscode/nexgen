import { Link } from "react-router-dom";
import BlogCard from "../utils/BlogCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAcademies } from "../api/apiEndpoints";
import { fetchAcademy } from "../redux/actions/academyActions";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/store";


// const data = [
//     {
//       "id": 1,
//       "title": "Top 5 Investment Strategies for 2024",
//       "image": "https://example.com/images/investment-strategies.jpg",
//       "description": "Discover the best ways to grow your wealth this year. Learn about diversified portfolios, risk management, and strategies that align with your financial goals. Start planning today to secure a successful financial future with smart investment decisions tailored to market trends and opportunities."
//     },
//     {
//       "id": 2,
//       "title": "How to Evaluate Property Before Investing",
//       "image": "https://example.com/images/property-evaluation.jpg",
//       "description": "Understand how to assess a property’s potential before investing. Key factors include location, market demand, rental yields, and long-term growth prospects. Make informed decisions with our step-by-step guide to ensure your investment aligns with your financial objectives and risk tolerance."
//     },
//     {
//       "id": 3,
//       "title": "Real Estate vs. Stock Market: Which is Better?",
//       "image": "https://example.com/images/real-estate-vs-stock.jpg",
//       "description": "Compare the benefits and risks of investing in real estate and the stock market. Understand market volatility, returns, liquidity, and long-term growth potential to choose the right investment strategy for your financial goals and risk appetite."
//     },
//     {
//       "id": 4,
//       "title": "Beginner’s Guide to Property Investment",
//       "image": "https://example.com/images/beginners-guide.jpg",
//       "description": "New to property investing? This guide simplifies the process, covering essential steps such as market research, budgeting, financing, and legal requirements. Start your journey with confidence and build a solid foundation for your real estate portfolio."
//     },
//     {
//       "id": 5,
//       "title": "The Future of Real Estate in the Digital Age",
//       "image": "https://example.com/images/digital-real-estate.jpg",
//       "description": "Explore how technology is revolutionizing the real estate industry. From virtual tours to blockchain transactions, discover innovative tools that simplify buying, selling, and investing in properties, making the process more transparent and efficient."
//     },
//     {
//       "id": 6,
//       "title": "10 Tips to Maximize Your Investment Returns",
//       "image": "https://example.com/images/maximize-returns.jpg",
//       "description": "Boost your investment returns with proven strategies. Learn about tax benefits, portfolio diversification, market timing, and how to leverage technology to optimize your real estate investments. Small adjustments can lead to significant financial gains."
//     },
//     {
//       "id": 7,
//       "title": "Understanding Market Trends in Real Estate",
//       "image": "https://example.com/images/market-trends.jpg",
//       "description": "Stay ahead of the curve by understanding real estate market trends. Analyze economic indicators, housing demands, and interest rates to make smarter investment decisions. Learn how to adapt to changes and maximize opportunities in a dynamic market."
//     },
//     {
//       "id": 8,
//       "title": "What Makes a Property a Good Investment?",
//       "image": "https://example.com/images/good-investment.jpg",
//       "description": "Learn what factors make a property a valuable investment. From location and infrastructure to potential rental income and resale value, uncover the secrets to identifying profitable real estate opportunities in any market."
//     },
//     {
//       "id": 9,
//       "title": "The Impact of Inflation on Real Estate Investments",
//       "image": "https://example.com/images/inflation-impact.jpg",
//       "description": "Understand how inflation influences real estate investments. Discover strategies to protect your portfolio, benefit from property appreciation, and leverage rental income as a hedge against rising costs in an unpredictable economic environment."
//     },
//     {
//       "id": 10,
//       "title": "Real Estate Investment Myths Debunked",
//       "image": "https://example.com/images/investment-myths.jpg",
//       "description": "Separate fact from fiction with our myth-busting guide to real estate investing. Learn the truth about common misconceptions, like risks, returns, and market accessibility, to make informed decisions and achieve your financial goals."
//     }
// ]
  
  

const Academy = () => {

    const [searchVal, setSearchVal] = useState('');
    const [filteredData, setFilteredData] = useState([]); 
    
    const { academies, loading, error} = useSelector((state: any) => ({
        academies: state?.academiesDetail?.academies,
        loading: state?.academiesDetail?.loading,
        error: state?.academiesDetail?.error
    }));
    const dispatch = useAppDispatch();
    
    const handleInput = (e:any) => {
        setSearchVal(e.target.value);
    }

    useEffect(() => {
        if (Array.isArray(academies)) {
            const filteredData:any = academies.filter((blog:any) => {
                return blog.title.toLowerCase().includes(searchVal.toLowerCase()) || blog.description.toLowerCase().includes(searchVal.toLowerCase());
            });
            // console.log(listItems)
            setFilteredData(filteredData);
        }    
    }, [searchVal, academies])

    // Always call fetchProjects
    useEffect(() => {
        dispatch(fetchAcademy());
    }, []);

    if (loading) {
        console.log('Data is loading...');
    }
    
    if (error) {
    console.error('Error fetching academies:', error);
    }
      

    return (
        <>
            <section className="_academy">
                <div className="_container _academy_wrapper">
                    <div className="_academy_head">
                        <Link className="_academy_head_link" to={`/`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} viewBox="0 0 41 41" fill="none">
                                <g clipPath="url(#clip0_581_4345)">
                                    <path d="M0.792649 20.0839C0.402125 20.4744 0.402125 21.1076 0.792649 21.4981L7.15661 27.8621C7.54713 28.2526 8.1803 28.2526 8.57082 27.8621C8.96135 27.4716 8.96135 26.8384 8.57082 26.4479L2.91397 20.791L8.57082 15.1342C8.96135 14.7436 8.96135 14.1105 8.57082 13.7199C8.1803 13.3294 7.54713 13.3294 7.15661 13.7199L0.792649 20.0839ZM2.3125 19.791H1.49976V21.791H2.3125V19.791Z" fill="#2A333A" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_581_4345">
                                        <rect x="0.5" y="0.791016" width={40} height={40} rx={20} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Go back
                        </Link>
                        <h1 className="_academy_title _h2">Tips for beginners</h1>
                        <div className="_academy_search-box_wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                <path d="M16.927 17.0401L20.4001 20.4001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11019 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11019 7.11019 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11019 19.2801 11.4401Z" stroke="#AAAAAA" strokeWidth={2} strokeLinecap="round" />
                            </svg>
                            <input
                                value={searchVal}
                                placeholder="Search..." 
                                onChange={handleInput}
                                className="_academy_search-box"
                            />
                        </div>
                    </div>
                    <div className="_academy_list">
                    {
                        filteredData && filteredData?.map((blog:any, index:number) => (
                            <BlogCard blog={blog} key={index}/>
                        ))
                    }
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Academy;