import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import YouTube from "react-youtube";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 1,
    },
};

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 10,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    },
};

const MovieList = ({ title, data }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState("");

    const handleTrailer = async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            };

            const res = await fetch(url, options);
            const data = await res.json();

            const trailer = data.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            if (trailer) {
                setVideoId(trailer.key);
                setIsOpen(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-white p-10 mb-10">
            <h2 className="uppercase text-xl mb-4">{title}</h2>
            <Carousel responsive={responsive}>
                {data &&
                    data.length > 0 &&
                    data.map((item) => (
                        <div
                            key={item.id}
                            className="w-[200px] h-[300px] relative group"
                            onClick={() => handleTrailer(item.id)}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
                            <img
                                src={`${import.meta.env.VITE_API_URL}${item.poster_path}`}
                                alt={item.title || item.original_title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                            />
                            <div className="absolute bottom-4 left-2 z-20">
                                <p className="uppercase text-md">
                                    {item.title || item.original_title}
                                </p>
                            </div>
                        </div>
                    ))}
            </Carousel>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Trailer Modal"
            >
                {videoId && <YouTube videoId={videoId} opts={opts} />}
            </Modal>
        </div>
    );
};

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
};

export default MovieList;
