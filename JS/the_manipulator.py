import sys
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageEnhance
from os import listdir
from os.path import isfile, join
import random
import json
import copy
import numpy as np

composite_key = 'composite_A'

class Manipulator:

    def __init__(self):
        print('BUILDING THE MANIPULATOR')
        with open('config_manipulator.json') as json_data_file:
            self.config = json.load(json_data_file)

    def Initialize(self, key):
        self.key = key
        self.params =  self.config[key]
        self.path_params = key.split('_')
        self.params['composite_group_path'] = '../images/' + self.path_params[0] + '/group_' + self.path_params[1] + '/'

    def Generate(self):
        if self.params['mode'] == 'single':
            self.GenerateSingle()
        elif self.params['mode'] == 'group':
            self.GenerateGroup()

    def GenerateSingle(self):
        composite_image_name = 'single_'
        composite_image_name += str(round(random.random() * 1000000))
        composite_image = self.generate_composite(composite_image_name)
        self.im_width = composite_image.size[0]
        self.im_height = composite_image.size[1]
        full_path = self.params['composite_group_path'] + composite_image_name + '.png'
        print('Saving image at ',full_path)
        composite_image.save(full_path)

    def GenerateGroup(self):
        composite_images = []
        image_name = str(round(random.random() * 1000000))

        base_image = self.generate_composite(image_name + '_base.png')
        if self.params['group_mode'] == 'A':
            top_right = base_image.transpose(Image.FLIP_LEFT_RIGHT)
            bottom_right = base_image.transpose(Image.ROTATE_180)
            bottom_left = base_image.transpose(Image.FLIP_TOP_BOTTOM)
        if self.params['group_mode'] == 'B':
            top_right = base_image.transpose(Image.ROTATE_90)
            bottom_right = base_image.transpose(Image.ROTATE_180)
            bottom_left = base_image.transpose(Image.ROTATE_270)

        self.im_width = base_image.size[0]
        self.im_height = base_image.size[1]
        composite_group_width = self.im_width * 2 
        composite_group_height = self.im_height * 2 
        composite_group = Image.new('RGBA', (composite_group_width, composite_group_height))
        
        composite_group.paste(base_image, (0,0))
        composite_group.paste(top_right, (self.im_width,0))
        composite_group.paste(bottom_left, (0,self.im_height))
        composite_group.paste(bottom_right, (self.im_width,self.im_height))
        full_path = self.params['composite_group_path'] + image_name + '.png'
        print('Saving image at ',full_path)
        composite_group = composite_group.resize((self.im_width,self.im_height))
        composite_group.save(full_path)

    def generate_composite(self, image_id):
        top_param = self.params['groups']['top'].split('_')
        bottom_param = self.params['groups']['bottom'].split('_')
        mask_param = self.params['groups']['mask'].split('_')

        # print(top_param,bottom_param,mask_param)

        top_source =    '../images//' + top_param[0]    + '//' + 'group_' + top_param[1] + '/'
        bottom_source = '../images//' + bottom_param[0] + '//' + 'group_' + bottom_param[1] + '/'
        mask_source =   '../images//' + mask_param[0]   + '//' + 'group_'  + mask_param[1] + '/'

        # print(top_source,bottom_source,mask_source)

        top_group_names =     [f for f in listdir(top_source)    if isfile(join(top_source, f))]
        bottom_group_names =  [f for f in listdir(bottom_source) if isfile(join(bottom_source, f))]
        mask_group_names =    [f for f in listdir(mask_source)   if isfile(join(mask_source, f))]

        # top_image_name =    'RdYlGn.png'
        # bottom_image_name = 'greys.png'
        top_image_name =    random.choice(top_group_names)
        bottom_image_name = random.choice(bottom_group_names)
        mask_image_name =   random.choice(mask_group_names)

        # print(top_image_name,bottom_image_name,mask_image_name)

        top_image =         Image.open(top_source + top_image_name)
        bottom_image =      Image.open(bottom_source + bottom_image_name)
        mask =              Image.open(mask_source + mask_image_name)

        bottom_image = bottom_image.rotate(-90)
        # print(top_image,bottom_image,mask)

        mask = self.binary(mask)
        final_img = Image.composite(bottom_image, top_image, mask)
        return final_img







#========================UNUSED BUT GOOD REFERENCE========================
    def colorize(self,img, low_color, high_color):
        print('colorizing...')
        img = img.convert('L')
        return ImageOps.colorize(img, black=low_color, white = high_color) 

    def enhance_edges(self,image):
        img = copy.copy(image)
        img = img.convert('L')
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.FIND_EDGES)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = self.binary(img)
        img = img.convert('RGBA')
        pixels = np.array(img.convert('L'))
        # print('edge detect...', len(pixels), len(pixels[0]))
        edge_thickness = 20
        import time

        print('start thickening edges...')
        start = time.time()
        for i in range(len(pixels)):
            for j in range(len(pixels[0])):
                if pixels[j][i] == 0:
                    for k in range(edge_thickness):
                        for l in range(edge_thickness):
                            if (j - k) >= 0 and (i - l) >= 0:
                                pixels[j - k][i - l] = 0
        end = time.time()
        print('finished thickening edges',end - start)
        print('mask created')
        edge_mask = Image.fromarray(pixels).convert('RGBA')
        edge_pixels = edge_mask.getdata()
        new_pixels = []
        for p in edge_pixels:
            if p[0] == 255 and p[1] == 255 and p[2] == 255:
                new_pixels.append((255, 255, 255, 0))
            else:
                new_pixels.append(p)
        # edge_mask = Image.fromarray(np.array(new_pixels))
        edge_mask.putdata(new_pixels)
        return Image.alpha_composite(image, edge_mask)

    def binary(self, img):
        img = img.convert('L')
        img = img.convert("RGBA")
        threshold = 155
        img = img.point(lambda i: i < threshold and 255)
        return img.convert('L')

    def change_contrast_multi(self,img, steps):
        width, height = img.size
        canvas = Image.new('RGB', (width * len(steps), height))
        for n, level in enumerate(steps):
            img_filtered = self.change_contrast(img, level)
            canvas.paste(img_filtered, (width * n, 0))
        return canvas

    def change_contrast(self,img, level):
        factor = (259 * (level + 255)) / (255 * (259 - level))
        def contrast(c):
            value = 128 + factor * (c - 128)
            return max(0, min(255, value))
        return img.point(contrast)

manip = Manipulator()
manip.Initialize(composite_key)
manip.Generate()

# # start process
# if __name__ == '__main__':
#     main()