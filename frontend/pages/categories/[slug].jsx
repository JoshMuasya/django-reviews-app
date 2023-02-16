import Layout from '@/components/Layout';
import { Card, CardContent, Grid, Typography, Button, InputLabel, Select, FormControl, MenuItem, Divider } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import useRouter from 'next/router';
import AverageReview from '@/components/AverageReview';

const Category = ({ category, averageReviews }) => {

    const router = useRouter

    const [price, setPrice] = useState('')
    const [numReviews, setNumReviews] = useState('')
    const [avgReviews, setAvgReviews] = useState('')

    const handleBusinessClick = business => {
        router.push(`/business/${business.slug}`)
    }

    const handleClearFilters = () => {
        setPrice('')
        setNumReviews('')
        setAvgReviews('')
    }

  return (
    <Layout>
        <Grid container style={{ marginTop: '75px', paddingLeft: '5px', paddingRight: '5px' }}>
            <Grid item xs={12} md={3}>
                <Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Filter the Results</Typography>
                            <Divider style={{ color: 'white' }} />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ borderColor: 'white' }}>
                                <InputLabel id='price' style={{ color: 'white' }}>Price</InputLabel>
                                <Select labelId='price'
                                    id='priceInput'
                                    label='Price'
                                    style={{ color: 'white' }}
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                >
                                    <MenuItem value={ '$' }>Very Cheap</MenuItem>
                                    <MenuItem value={ '$$' }>Cheap</MenuItem>
                                    <MenuItem value={ '$$$' }>Moderate</MenuItem>
                                    <MenuItem value={ '$$$$' }>Expensive</MenuItem>
                                    <MenuItem value={ '$$$$$' }>Very Expensive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container style={{ paddingTop: '5px', marginBottom:'5px' }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ borderColor: 'white' }}>
                                <InputLabel id='numReviews' style={{ color: 'white' }}>Number of Reviews</InputLabel>
                                <Select 
                                    labelId='numReviews'
                                    id='numReviewsInput'
                                    label='Number of Reviews'
                                    style={{ color: 'white' }}
                                    onChange={e => setNumReviews(e.target.value)}
                                    value={numReviews}
                                >
                                    <MenuItem value={ 5 }>5+</MenuItem>
                                    <MenuItem value={ 10 }>10+</MenuItem>
                                    <MenuItem value={ 15 }>15+</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container style={{ paddingTop: '5px', marginBottom:'5px' }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ borderColor: 'white' }}>
                                <InputLabel id='numReviews' style={{ color: 'white' }}>Average Reviews</InputLabel>
                                <Select 
                                    labelId='avgReviews'
                                    id='avgReviewsInput'
                                    label='Average Reviews'
                                    style={{ color: 'white' }}
                                    onChange={e => setAvgReviews(e.target.value)}
                                    value={avgReviews}
                                >
                                    <MenuItem value={ 3 }>3+ Stars</MenuItem>
                                    <MenuItem value={ 4 }>4+ Stars</MenuItem>
                                    <MenuItem value={ 5 }>5+ Stars</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid>
                            <Button variant='outlined' color='secondary' onClick={handleClearFilters}>Clear Filters</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Grid>

            <Grid item xs={12} md={9}>
                {category.business.map(business => (
                    (!price || price === business.price_range) && (!numReviews || business.reviews.length >= numReviews ) && (!avgReviews || averageReviews[business.url] >= avgReviews) && (
                        <Card style={{ cursor: 'pointer' }} onClick={ () => handleBusinessClick(business) }>
                            <Box>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant='h5'>{ business.name }</Typography>
                                            <Typography variant='subtitle1'>{ business.price_range }</Typography>
                                            <Link variant='subtitle1' href={ business.website }>{ business.website }</Link>
                                            <Typography variant='subtitle1'>{ business.phone }</Typography>
                                            <Typography variant='subtitle1'>{ business.description }</Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <AverageReview value={averageReviews[business.url]} />
                                            <Typography variant='subtitle1'>{ business.hours }</Typography>
                                            <Typography variant='subtitle1'>{ business.street_address } { business.city } { business.region } { business.postal_code } { business.country }</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                        </Card>
                    )
                ))}                
            </Grid>
        </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ query: {slug} }) {
    // Fetch our Data
    const { data } = await axios.get(`http://127.0.0.1:8000/categories?slug=${slug}`)

    let avgReviews = {}

    if (data && data.results && data.results[0].business) {
        for (let i = 0; i < data.results[0].business.length; i++) {
            let totalReviewsStars = 0

            for (let j = 0; j < data.results[0].business[i].reviews.length; j++) {
                totalReviewsStars = totalReviewsStars + Number(data.results[0].business[i].reviews[j].stars)
            }

            const inverse = 1 / 2

            avgReviews[data.results[0].business[i].url] = Math.round(totalReviewsStars / data.results[0].business[i].reviews.length / inverse) * inverse
        }
    }
  
    return {
      props: {
        category: data.results[0] || null,
        averageReviews: avgReviews
      }
    }
  }

export default Category;