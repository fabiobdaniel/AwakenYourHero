# 📸 How to Add the Book Image - Step by Step

## Method 1: Using File System (Recommended)

### Step 1: Save the Image
1. Save the book cover/poster image you have
2. Name it: `disciplined-destiny-book.jpg` (or `.png`)
3. Recommended size: max width 600px (height will be proportional)

### Step 2: Copy to Assets Folder
Copy the image file to:
```
/Users/fabiodaniel/Documents/GitHub/AwakenYourHero/assets/disciplined-destiny-book.jpg
```

### Step 3: Commit and Push
```bash
cd /Users/fabiodaniel/Documents/GitHub/AwakenYourHero
git add assets/disciplined-destiny-book.jpg
git commit -m "Add Disciplined Destiny book cover image"
git push origin main
```

### Step 4: Verify
The image will automatically appear on the About page after deployment.

---

## Method 2: Using External URL (If image is hosted elsewhere)

If your image is already hosted online (e.g., on a CDN, Google Drive, etc.), you can update the code to use that URL instead.

### Step 1: Get the Image URL
Copy the direct URL to your image (must be publicly accessible).

### Step 2: Update the Code
I can update `assets/contact-form.js` to use your image URL instead of the local path.

---

## Method 3: Using Base64 (For small images)

If the image is small (< 100KB), you can embed it directly in the code as Base64.

---

## Current Image Path in Code

The code currently looks for the image at:
```javascript
bookImage.src = '/assets/disciplined-destiny-book.jpg';
```

This means the image should be at:
```
/assets/disciplined-destiny-book.jpg
```

---

## Quick Test

After adding the image, you can test locally:
```bash
cd /Users/fabiodaniel/Documents/GitHub/AwakenYourHero
python3 -m http.server 8000
```

Then open: `http://localhost:8000/about` and check if the image appears.

---

## Need Help?

If you have the image file ready, I can help you:
1. Update the code to use a different path/URL
2. Convert the image to the right format/size
3. Set up a different hosting method

Just let me know where your image is located or if you need help with any step!
