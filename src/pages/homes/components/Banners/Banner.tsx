

export default function Banner() {
    return (
        <div>
            <div className="banner">
                <>
                    {/* Carousel wrapper */}
                    <div
                        id="carouselVideoExample"
                        className="carousel slide carousel-fade"
                        data-mdb-ride="carousel"
                    >
                        {/* Inner */}
                        <div className="carousel-inner">
                            {/* Single item */}
                            <div className="carousel-item active">
                                <video className="img-fluid" autoPlay loop muted>
                                    <source
                                        src="https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/video%2Fintro.mp4?alt=media&token=58c91933-2562-4342-8f1f-437f73d79234"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        </div>
                        {/* Inner */}
                    </div>
                    {/* Carousel wrapper */}
                </>
            </div>
        </div>
    )
}
