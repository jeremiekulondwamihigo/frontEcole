import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { Upload } from 'antd';
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Typography, Button } from '@mui/material';
import { putEleve } from 'Redux/Inscrit';

const UploadImage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eleve = useSelector((state) => state.eleveinfo.eleve);
  const [eleveFound, setEleveFound] = React.useState();
  const loading = () => {
    let elev = _.filter(eleve, { _id: id });
    if (elev.length < 1) {
      setEleveFound();
    } else {
      setEleveFound(elev);
    }
  };
  console.log(id);
  React.useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const sendImages = () => {
    const data = {
      id,
      data: {
        filename: fileList[0].thumbUrl
      }
    };
    dispatch(putEleve(data));
  };
  return (
    <MainCard>
      <Typography>Modifiez la photo de l&apos;élève {eleveFound && eleveFound[0].fullname}</Typography>
      <ImgCrop rotationSlider>
        <Upload listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
          {fileList.length < 1 && 'Upload'}
        </Upload>
      </ImgCrop>
      <Button color="primary" variant="contained" onClick={(e) => sendImages(e)}>
        Update
      </Button>
    </MainCard>
  );
};
export default UploadImage;
