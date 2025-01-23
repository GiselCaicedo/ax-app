'use client'

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  IconButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion, AnimatePresence } from 'framer-motion';
import { getPremios } from '@src/service/conexion';
import ZanahoriaIcon from '@recursos/RECURSOS/zanahoria_icono.svg'

const theme = createTheme({
  palette: {
    primary: {
      main: '#471322',
    },
    error: {
      main: '#E31E24',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    }
  },
  typography: {
    h5: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '1px',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '10px 0px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(227, 30, 36, 0.25)',
          },
        },
        containedError: {
          background: '#E31E24',
          '&:hover': {
            background: '#CC1B20',
          },
        },
      },
    },
  },
});

interface ProcessedProduct {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ProductCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getPremios();
        setProducts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / 4);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const previousPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = products.slice(currentPage * 4, (currentPage + 1) * 4);

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
         
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress color="error" />
            </div>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <div className="relative px-2 mb-40">
              <IconButton
                onClick={previousPage}
                sx={{
                  position: 'absolute',
                  left: -32,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#ffff',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                }}
              >
                <ChevronLeftIcon sx={{ color: '#471322' }} />
              </IconButton>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={4}>
                    {currentProducts.map((product) => (
                      <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card
                          elevation={0}
                          sx={{
                            height: '100%',
                            background: '#FFFFFF',
                            border: '1px solid rgba(0,0,0,0.08)',
                          }}
                        >
                          <div className="relative pt-[100%] overflow-hidden">
                            <CardMedia
                              component="img"
                              image={product.image}
                              alt={product.title}
                              sx={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                p: 4,
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.08)',
                                },
                              }}
                            />
                          </div>
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <ZanahoriaIcon />
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  color: '#666',
                                  fontSize: '0.9rem'
                                }}
                              >
                                {Math.floor(product.price)} zanahorias
                              </Typography>
                            </div>
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'primary.main',
                                mb: 3,
                                fontSize: '1rem',
                                lineHeight: 1.4,
                                height: '2.8em',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {product.title}
                            </Typography>
                            <Button
                              variant="contained"
                              color="error"
                              fullWidth
                              sx={{
                                mt: 'auto',
                                fontSize: '0.875rem',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              REDIMIR
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </AnimatePresence>

              <IconButton
                onClick={nextPage}
                sx={{
                  position: 'absolute',
                  right: -32,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#f8f8f8',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                }}
              >
                <ChevronRightIcon sx={{ color: '#471322' }} />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProductCarousel;