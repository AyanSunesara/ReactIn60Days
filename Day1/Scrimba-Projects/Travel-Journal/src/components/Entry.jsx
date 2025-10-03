import './Entry.css'
import places from './data.js'

function Entry(props){
    return(
        <article className="journal-entry">
            <div className="main-image-container">
                <img 
                    className="main-image"
                    src={props.imageUrl.src}
                    alt={props.imageUrl.alt}
                />
            </div>
            <div className="info-container">
                <div className="info-header">
                    <img 
                        className="marker"
                        src="src/assets/marker.svg" 
                        alt="map marker icon"
                    />
                    <span className="country">Japan</span>
                    <a href={props.googleMapsLink}>View on Google Maps</a>
                </div>
                
                <h2 className="entry-title">{props.title}</h2>
                <p className="trip-dates">{props.dates}</p>
                <p className="entry-text">{props.text}</p>
            </div>
            
        </article>
    );

}

export default function Data() {
    const place = places.map(place => 
        <Entry
            key={place.id}
            title={place.title}
            googleMapsLink={place.googleMapsLink}
            dates={place.dates}
            text={place.text}
            imageUrl={place.img}
            
        />
    )

    return (
        <section className="entries-container">
            {place}
        </section>
    )
}