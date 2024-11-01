import Image from 'next/image';
import Box from '@mui/material/Box';

const ResponsiveImage = ({ src, alt }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        // Define image width for various screen sizes
        width: {
          xs: '200%', // default for extra-small screens
          '@media (min-width:600px)': {
            width: '75%', // small screens
          },
          '@media (min-width:960px)': {
            width: '60%', // medium screens
          },
          '@media (min-width:1280px)': {
            width: '50%', // large screens
          },
          '@media (min-width:1920px)': {
            width: '35%', // extra-large screens
          }
        },
        height: 'auto' // to maintain aspect ratio
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill // This makes the image fill the box
        objectFit="contain" // Ensures the image fits within the box
      />
    </Box>
  );
};

export default ResponsiveImage;
