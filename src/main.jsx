import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GuideApp from './guide/GuideApp.jsx';
import BuildApp from './build/BuildApp.jsx';
import './styles/styles.css';

// Routing (Build is the live site now):
//   /           the site ("senior engineers who build")
//   /variant-1  legacy variant A, automation focus ("we automate the work you hate")
//   /variant-2  legacy variant B, trusted guide through the noise
// The variant paths are kept for reference and will be removed soon.
const path = window.location.pathname.replace(/\/+$/, '');
const VARIANTS = { '/variant-1': App, '/variant-2': GuideApp };
const Root = VARIANTS[path] || BuildApp;

createRoot(document.getElementById('root')).render(<Root />);
