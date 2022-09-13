import Carousel from 'react-bootstrap/Carousel';

function CarouselGallery() {

  const images = [
    {"image": "https://picsum.photos/id/137/500/200", "alt": "First slide", "header": "First slide label", "text": "Nulla vitae elit libero, a pharetra augue mollis interdum."},
    {"image": "https://picsum.photos/id/237/500/200", "alt": "Second slide", "header": "Second slide label", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {"image": "https://picsum.photos/id/337/500/200", "alt": "Third slide", "header": "Third slide label", "text": "Praesent commodo cursus magna, vel scelerisque nisl consectetur."}
  ]

  return ( 
    <Carousel>
      { images.map(element => <Carousel.Item key={element.image}>
        <img
          src={element.image}
          alt={element.alt}
        />
        <Carousel.Caption>
          <h3>{element.header}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item> )}
    </Carousel>
   );
}

export default CarouselGallery;