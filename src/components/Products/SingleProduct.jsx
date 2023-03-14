import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Product from './Product';

import { ROUTES } from '../../utills/routes'
import { useGetProductQuery } from '../../features/api/apiSlice';

const SingleProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({id})

    useEffect(() => {
        if(!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isFetching, isSuccess, navigate])

    return (
        !data ? (
            <section className="preloader">
                Loading...
            </section>
        ) : (
            <>
                <Product {...data} />
            </>
        )
    );
};

export default SingleProduct;