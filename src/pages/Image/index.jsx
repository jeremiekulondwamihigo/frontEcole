import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Typography, Button } from '@mui/material';
import { putEleve } from 'Redux/Inscrit';
import { putParent } from 'Redux/Parent';

const UploadImage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eleve = useSelector((state) => state.eleveinfo.eleve);
  const parent = useSelector((state) => state.parents.parent);

  const [parentElve, setParentEleve] = useState({ nom: '', titre: '' });
  const loading = () => {
    let elev = _.filter(eleve, { _id: id });
    let pare = _.filter(parent, { _id: id });
    var nom = '';
    if (elev.length > 0) {
      setParentEleve({ nom: elev[0].fullname, titre: 'eleve' });
    }
    if (pare.length > 0) {
      setParentEleve({ nom: pare[0].nom, titre: 'enseignant' });
    }
    return { nom };
  };
  useEffect(() => {
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
    dispatch(parentElve.titre === 'eleve' ? putEleve(data) : putParent(data));
  };
  return (
    <MainCard>
      <Typography>
        Modifiez la photo de l&apos;{parentElve.titre} {parentElve.nom}
      </Typography>
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
