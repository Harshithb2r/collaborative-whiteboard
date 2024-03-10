// Whiteboard.js

import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';

const socket = io('http://localhost:7000'); // Connect to the WebSocket server

const Whiteboard = () => {
    const canvasRef = useRef(null);
    let canvas;
    const [paths, setPaths] = useState([]);

    const [brushColor, setBrushColor] = useState('black');
    const [brushSize, setBrushSize] = useState(5);

    useEffect(() => {
        canvas = new fabric.Canvas(canvasRef.current);

        // Set canvas dimensions
        canvas.setWidth(1100);
        canvas.setHeight(500);

        // Enable free drawing mode
        canvas.isDrawingMode = true;

        // Set initial brush color and size
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushSize;

        // Event listener for changes in drawing color and size
        canvas.on('path:created', (e) => {
            // Send drawing data to the server
            socket.emit('draw', { path: e.path, color: brushColor, size: brushSize });
        });

        return () => {
            // Cleanup function
            canvas.dispose();
        };
    }, [brushColor, brushSize]);

    const handleChangeColor = (color) => {
        setBrushColor(color);
    };

    const handleChangeSize = (size) => {
        setBrushSize(size);
    };

    const handleUndo = () => {
        if (paths.length > 0) {
            setPaths(prevPaths => {
                const updatedPaths = [...prevPaths];
                updatedPaths.pop(); // Remove the last drawn path
                return updatedPaths;
            });
            redrawCanvas(paths.slice(0, -1));
        }
    };

    const redrawCanvas = (paths) => {
        canvas.clear(); // Clear the canvas
        paths.forEach((path) => {
            canvas.add(new fabric.Path(path.path, path));
        });
    };

    const handleredo = () => {

    }

    const handleExportImage = () => {
        const dataURL = canvas.toDataURL({ format: 'png' });
        // Create a temporary link element to download the image
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'whiteboard_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        const pdf = new fabric.StaticCanvas(null, { width: canvas.getWidth(), height: canvas.getHeight() });
        pdf.add(canvas);
        const dataURL = pdf.toDataURL({ format: 'pdf' });

        // Create a temporary link element to download the PDF
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'whiteboard_pdf.pdf';
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Delay the removal of the link after download has completed
        setTimeout(() => {
            document.body.removeChild(link);
        }, 1000); // Adjust the delay as needed
    };


    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Whiteboard</span>
                    <div className="d-flex">
                        <button className="btn btn-outline-light me-2" onClick={handleExportImage}><i className="bi bi-image me-1"></i>Export as Image</button>
                        <button className="btn btn-outline-light" onClick={handleExportPDF}><i className="bi bi-file-earmark-pdf me-1"></i>Export as PDF</button>
                    </div>
                </div>
            </nav>
            <div className="container mt-3 shadow-lg p-4 rounded">
                <div className="row">
                    <div className="col">
                        <h2 className="mb-4">Whiteboard</h2>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="form-label me-2 mb-0">Brush Color:</label>
                            <input type="color" className="form-control-color me-2" value={brushColor} onChange={(e) => handleChangeColor(e.target.value)} />
                            <label className="form-label me-2 mb-0">Brush Size:</label>
                            <div className="d-flex align-items-center">
                                <input type="range" className="form-range me-2" min="1" max="20" value={brushSize} onChange={(e) => handleChangeSize(parseInt(e.target.value))} />
                                <span className="badge bg-primary rounded-pill">{brushSize}</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2"><i className="bi bi-arrow-counterclockwise me-1"></i>Undo</button>
                            <button className="btn btn-primary me-2"><i className="bi bi-arrow-clockwise me-1"></i>Redo</button>
                        </div>
                    </div>
                </div>



                <div className="row mt-3">
                    <div className="col">
                        <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;
