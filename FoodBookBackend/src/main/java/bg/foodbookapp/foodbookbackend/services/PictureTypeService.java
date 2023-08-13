package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.entities.PictureType;
import bg.foodbookapp.foodbookbackend.models.enums.Type;
import bg.foodbookapp.foodbookbackend.repositories.PictureTypeRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class PictureTypeService {
    private final PictureTypeRepository pictureTypeRepository;

    @PostConstruct
    private void initPictureTypes() {

        if (pictureTypeRepository.count() == 0) {
            Arrays.stream(Type.values()).map(type -> {
                PictureType pictureType = new PictureType();
                pictureType.setType(type);
                return pictureType;
            }).forEach(pictureTypeRepository::save);
        }
    }
}
