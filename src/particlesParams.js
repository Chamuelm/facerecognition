const particleParams = {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "line_linked": {
            "enable": true,
            "opacity": 0.02
        },
        "move": {
            "direction": "right",
            "speed": 0.3
        },
        "size": {
            "value": 1.3
        },
        "opacity": {
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.05
            }
        }
    },
    "interactivity": {
        "events": {
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        },
        "modes": {
            "push": {
                "particles_nb": 1
            }
        }
    },
    "retina_detect": true
}; 
    

export default particleParams;