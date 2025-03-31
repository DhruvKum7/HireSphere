import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create company. Please try again.");
        }
    };

    return (
        <motion.div
            className="bg-white min-h-screen"
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: 20 } }
            transition={ { duration: 0.5 } }
        >
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 p-5">
                <div className="my-10">
                    <h1 className="font-bold text-2xl text-blue-600">Your Company Name</h1>
                    <p className="text-gray-500">What would you like to give your company name? You can change this later.</p>
                </div>

                <Label className="text-gray-700">Company Name</Label>
                <Input
                    type="text"
                    className="my-2 border border-gray-300 rounded-md shadow-sm transition duration-200 focus:border-blue-400"
                    placeholder="JobHunt, Microsoft etc."
                    value={ companyName }
                    onChange={ (e) => setCompanyName(e.target.value) }
                />
                <div className="flex items-center gap-2 my-10">
                    <Button
                        variant="outline"
                        onClick={ () => navigate("/admin/companies") }
                        className="transition duration-200 hover:bg-blue-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={ registerNewCompany }
                        className="bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default CompanyCreate;
