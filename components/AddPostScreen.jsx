
const [image, setImage] = useState(null)
const [uploading, setUploading] = useState(false)
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      // We can specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   
      // 0 means compress for small size, 1 means compress for maximum quality
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
