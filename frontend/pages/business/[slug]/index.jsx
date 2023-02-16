import Layout from '@/components/Layout';

import React, { useState } from 'react';
import axios from 'axios';
import { Card, List, ListItem, ListItemText, Button, Box, CardContent, Select, Grid, Typography, FormControl, InputLabel, MenuItem, Divider } from '@mui/material';
import AverageReview from '@/components/AverageReview';

const BusinessPage = ({ business, averageReview }) => {

    const [reviewFilter, setReviewFilter] = useState('')

  return (
    <Layout>
        <Grid container style={{ marginTop: '75px', paddingLeft: '10px', paddingRight: '5px' }}>
            <Grid item xs={12} md={6}>
                <Typography variant='h2'>{ business.name }</Typography>
                <Typography variant='h4'>{ business.price_range }</Typography>
                <AverageReview value={averageReview} />

                <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <Button variant='contained' color='primary'>Write a Review</Button>
                </div>

                <div>
                    <Typography variant='p'>{ business.description }</Typography>
                </div>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card>
                    <List>
                        <ListItem>
                            <ListItemText primary='Website' secondary={ business.website } />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary='Address' secondary={ `${ business.street_address }, ${ business.city }, ${ business.region }, ${ business.postal_code }, ${ business.country }`} />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary='Phone' secondary={ business.phone } />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary='Hours' secondary={ business.hours } />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>

        <Grid container>
            <Grid item xs={12} md={3}>
                <Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Filter the Reviews</Typography>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullwidth>
                                <InputLabel id='reviews'>Review</InputLabel>
                                <Select
                                    labelId='reviews'
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    id='reviewsComponent'
                                    value={reviewFilter}
                                    onChange={e => setReviewFilter(e.target.value)}
                                >
                                    <MenuItem value={1}>1+ Stars</MenuItem>
                                    <MenuItem value={2}>2+ Stars</MenuItem>
                                    <MenuItem value={3}>3+ Stars</MenuItem>
                                    <MenuItem value={4}>4+ Stars</MenuItem>
                                    <MenuItem value={5}>5+ Stars</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button variant='outlined' color='secondary' onClick={() => setReviewFilter('')}>Clear Filters</Button>
                    </Grid>
                </Box>
            </Grid>

            <Grid item xs={12} md={9}>
                {business && business.reviews && business.reviews.map(review => (
                    reviewFilter <= review.stars && (
                        <Card>
                            <Box>
                                <CardContent>
                                    <AverageReview value={review.stars} />
                                    <Typography variant='h5'>{review.title}</Typography>
                                    <Typography variant='subtitle1'>{review.content}</Typography>
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
    const { data } = await axios.get(`http://127.0.0.1:8000/businesses?slug=${slug}`)

    let avgReview = null

    if (data && data.results && data.results[0].reviews) {
        let totalReviewsStars = 0
        for (let i = 0; i < data.results[0].reviews.length; i++) {
            totalReviewsStars = totalReviewsStars + Number(data.results[0].reviews[i].stars)
        }

        const inverse = 1 / 2

        avgReview = Math.round((totalReviewsStars / data.results[0].reviews.length) / inverse) * inverse
    }
  
    return {
      props: {
        business: data.results[0] || null,
        averageReview: avgReview
      }
    }
  }

export default BusinessPage