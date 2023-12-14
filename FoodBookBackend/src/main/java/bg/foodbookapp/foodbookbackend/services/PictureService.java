package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.entities.Picture;
import bg.foodbookapp.foodbookbackend.models.enums.Type;
import bg.foodbookapp.foodbookbackend.repositories.PictureRepository;
import bg.foodbookapp.foodbookbackend.repositories.PictureTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class PictureService {
    private final PictureRepository pictureRepository;

    private final PictureTypeRepository pictureTypeRepository;

    public Picture addPicture(MultipartFile pictureFile, Type pictureType) {
        Picture picture = new Picture();
        try {
            picture.setPicture(pictureFile.getBytes());
        } catch (IOException ignored) {
        }
        picture.setFileType(pictureFile.getContentType());
        picture.setPictureType(pictureTypeRepository.getPictureTypeByType(pictureType));

        return pictureRepository.save(picture);
    }

    public void removePicture(Picture picture) {
        pictureRepository.delete(picture);
    }
}
