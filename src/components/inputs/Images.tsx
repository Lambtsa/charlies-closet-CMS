import React from 'react';
import ImageSlot from './ImageSlot';

interface ImagesProps {
  state: {
    itemImages: string[],
    setItemImages: any,
  },
  itemTitle: string,
}

const Images = (props: ImagesProps) => {

  return (
    <>
        <label className="images">
          Images
          <div className="images__upload">
            <ImageSlot state={props.state} itemTitle={props.itemTitle} slot={1} />
            <ImageSlot state={props.state} itemTitle={props.itemTitle} slot={2} />
            <ImageSlot state={props.state} itemTitle={props.itemTitle} slot={3} />
          </div>
        </label>
    </>
  )
};

export default Images;