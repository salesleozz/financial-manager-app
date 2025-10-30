import {API_ENDPOINTS, CLOUDINARY_UPLOAD_PRESET} from "./apiEndpoints.js";

const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            // Tenta ler a resposta de erro como JSON, mas não falha se não for JSON.
            const errorData = await response.json().catch(() => null); 
            // Constrói a mensagem de erro: usa a mensagem do Cloudinary se existir, senão usa o status da resposta.
            const errorMessage = errorData?.error?.message || `Request failed with status ${response.status}`;
            
            console.error("Cloudinary Error Response:", errorData); // Loga a resposta completa para depuração.
            
            throw new Error(`Cloudinary upload failed: ${errorMessage}`);
        }

        const data = await response.json();
        console.log('Image uploaded successfully.', data);
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading the image", error);
        throw error;
    }
}

export default uploadProfileImage;