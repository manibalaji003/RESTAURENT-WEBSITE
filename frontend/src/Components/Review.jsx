import React from 'react'
import { Container,Card } from 'react-bootstrap'

const Review = () => {
    let star=<i class="bi bi-star-fill"></i>;

  return (
    <>
        <div className='review '>
            <div  className='allreview'>
                <Card style={{ width: '14rem' }}>
                        <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                 <Card.Text>
                                       Some quick example text to build on the card title and make up the
                                      bulk of the card's content.
                                 </Card.Text>
                          </Card.Body>
                </Card>
            </div>
            <div className='allreview' >
                        <Card style={{ width: '14rem' }}>
                        <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                 <Card.Text>
                                       Some quick example text to build on the card title and make up the
                                      bulk of the card's content.
                                 </Card.Text>
                          </Card.Body>
                </Card>
            </div>
            <div className='allreview' >
                        <Card style={{ width: '14rem' }}>
                        <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                 <Card.Text>
                                       Some quick example text to build on the card title and make up the
                                      bulk of the card's content.
                                 </Card.Text>
                          </Card.Body>
                </Card>
            </div>
            <div className='allreview' >
                        <Card style={{ width: '14rem' }}>
                        <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                 <Card.Text>
                                       Some quick example text to build on the card title and make up the
                                      bulk of the card's content.
                                 </Card.Text>
                          </Card.Body>
                </Card>
            </div>
            
            <div className='allreview' >
                        <Card style={{ width: '14rem' }}>
                        <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                 <Card.Text>
                                       Some quick example text to build on the card title and make up the
                                      bulk of the card's content.
                                 </Card.Text>
                          </Card.Body>
                </Card>
            </div>

        </div>
    </>
  )
}

export default Review