"""Install: pip install pillow 'qrcode[pil]' numpy zxing-cpp
Normal photo: python generate_heart_qr.py --image photo.jpg --url https://example.com --output result.png
Existing heart artwork: add --art-mode
Photo mode is procedural halftone art, not the exact AI-generated reference style.
"""
import argparse
import random
import numpy as np
from PIL import Image, ImageDraw, ImageOps, ImageEnhance
import qrcode
import zxingcpp

SIZE=1254


def portrait_art(path):
    canvas=Image.new('RGB',(SIZE,SIZE),'white')
    d=ImageDraw.Draw(canvas)
    rng=random.Random(42)
    # Heart silhouette, filled with decorative dots (not QR data).
    for y in range(70,1200,18):
        for x in range(36,1220,18):
            xx=(x-627)/540
            yy=-(y-525)/530
            if (xx*xx+yy*yy-1)**3-xx*xx*yy**3<=0 and rng.random()<0.66:
                d.rounded_rectangle((x-6,y-6,x+6,y+6),radius=3,fill='black')
    # Large monochrome portrait in a softly masked central oval.
    photo=ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    photo=ImageOps.fit(photo,(660,820),method=Image.Resampling.LANCZOS,centering=(0.5,0.4))
    gray=ImageEnhance.Contrast(ImageOps.grayscale(photo)).enhance(1.35)
    # Fine ordered halftone dots rather than a small logo.
    tones=np.asarray(gray.resize((220,274))).astype(float)
    halftone=Image.new('RGB',(660,822),'white')
    hd=ImageDraw.Draw(halftone)
    for y in range(274):
        for x in range(220):
            r=1.9*((255-tones[y,x])/255)**0.7
            if r>0.15:
                cx=x*3+1;cy=y*3+1
                hd.ellipse((cx-r,cy-r,cx+r,cy+r),fill='black')
    mask=Image.new('L',halftone.size,0)
    ImageDraw.Draw(mask).ellipse((0,0,659,821),fill=255)
    canvas.paste(halftone,(297,205),mask)
    # Decorative top squares, not functional finder patterns of the bottom QR.
    for x in (140,934):
        d.rectangle((x-18,232,x+182,432),fill='white')
        d.rectangle((x,250,x+164,414),fill='black')
        d.rectangle((x+24,274,x+140,390),fill='white')
        d.rectangle((x+47,297,x+117,367),fill='black')
    return canvas


def generate(image,url,output,art_mode=False):
    if not url.strip():
        raise ValueError('URL empty nahi ho sakta')
    if art_mode:
        art=ImageOps.exif_transpose(Image.open(image)).convert('RGB')
        art=ImageOps.fit(art,(SIZE,SIZE),method=Image.Resampling.LANCZOS)
        # Remove the old decorative bottom marker in the supplied template.
        ImageDraw.Draw(art).rectangle((548,961,704,1108),fill='white')
    else:
        art=portrait_art(image)
    # Keep QR small where possible, but only save a decoder-tested candidate.
    for box in (5,6,7,8,9,10):
        qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,box_size=box,border=4)
        qr.add_data(url)
        qr.make(fit=True)
        tile=qr.make_image(fill_color='black',back_color='white').convert('RGB')
        if tile.width>600:
            continue
        result=art.copy()
        x=(SIZE-tile.width)//2
        y=min(1036-tile.height//2,SIZE-tile.height-20)
        result.paste(tile,(x,y))  # No extra decorative border.
        decoded=[r.text for r in zxingcpp.read_barcodes(np.asarray(result))]
        if url in decoded:
            result.save(output)
            print('Saved:',output)
            print('Full-image ZXing test: PASS')
            print('Decoded URL:',url)
            print('QR size:',tile.width,'px. Phone se bhi scan test karein.')
            return
    raise RuntimeError('Scan test failed. Output save nahi kiya. Shorter URL try karein.')


if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--image',required=True)
    p.add_argument('--url',required=True)
    p.add_argument('--output',default='my_heart_qr.png')
    p.add_argument('--art-mode',action='store_true',help='Input already is heart portrait artwork')
    a=p.parse_args()
    generate(a.image,a.url,a.output,a.art_mode)
