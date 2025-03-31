import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                console.log(searchedQuery)
                // Construct the API endpoint with the search query as a query parameter
                const queryParam = searchedQuery ? `?keyword=${searchedQuery}` : '';
                const response = await axios.get(`${JOB_API_END_POINT}/get${queryParam}`, {
                    withCredentials: true
                });
                console.log(response)
                // Log and dispatch the data if successful
                if (response?.data?.success) {
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        };

        // Call the function to fetch jobs
        fetchAllJobs();
    }, [searchedQuery, dispatch]); // Dependency array includes searchedQuery to refetch on change
};

export default useGetAllJobs;
