import unknown from "./assets/Unknown_person.jpg";

class UTILS {
    static getImageUrl(imageBase64) {
        let imageURL;

        if (imageBase64 === null) {
            imageURL = unknown;
        } else {
            switch (Array.from(imageBase64)[0]) {
                case "/":
                    imageURL = "data:image/jpeg;base64," + imageBase64;
                    break;
                case "i":
                    imageURL = "data:image/png;base64," + imageBase64;
                    break;
                case "R":
                    imageURL = "data:image/gif;base64," + imageBase64;
                    break;
                case "U":
                    imageURL = "data:image/webp;base64," + imageBase64;
                    break;
                case "J":
                    imageURL = "data:image/pdf;base64," + imageBase64;
                    break;
                case "P":
                    imageURL = "data:image/svg+xml;base64," + imageBase64;
                    break;
                case "T":
                    imageURL = "data:image/tiff;base64," + imageBase64;
                    break;
                default:
                    imageURL = unknown;
            }
        }

        return imageURL;
    }
}

export default UTILS;