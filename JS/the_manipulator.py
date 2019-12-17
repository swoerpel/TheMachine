import sys
from PIL import Image, ImageDraw, ImageFilter, ImageOps    
from os import listdir
from os.path import isfile, join
import random
import json
import numpy as np

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
        self.composite_images = []
        for i in range(4):
            composite_image_name = str(i + 1) #round(random.random() * 1000000)
            composite_image = self.generate_composite(composite_image_name)
            self.composite_images.append(composite_image)
            
        # print('Saving Composite Image...',self.params['composite_group_path']+'chez.png')
        # self.composite_images[0].save(self.params['composite_group_path']+'chez.png')

        # combined_images = []
        # for i in range(4):
        #     im = Image.alpha_composite(self.composite_images[i],self.composite_images[(i + 1) % 4])
        #     combined_images.append(im)

        im_width = self.composite_images[0].size[0]
        im_height = self.composite_images[0].size[1]
        composite_group_width = im_width * 2
        composite_group_height = im_height * 2
        composite_group = Image.new('RGBA', (composite_group_width, composite_group_height))

        for i in range(2):
            for j in range(2):
                # im = self.edge_detect(self.composite_images[i])
                # im = ImageOps.invert(im)
                composite_group.paste(im, (im_width * i, im_height * j))
            # composite_group.paste(combined_images[i],(im_width * i,0))
            # composite_group.paste(self.composite_images[i], (im_width * i,0))
        
        print('Saving Composite Group...', self.params['composite_group_path'] + 'chez.png')
        composite_group.save(self.params['composite_group_path']+'chez.png')
        # self.composite_images[0].save(self.params['composite_group_path']+'chez_A.png')
        # im = self.edge_detect(self.composite_images[0])#.save(self.params['composite_group_path']+'chez_B.png')
        # ImageOps.invert(im).save(self.params['composite_group_path']+'chez_B.png')


        # bailey = Image.open(self.params['composite_group_path']+'bailey.jpg')
        # self.edge_detect(bailey).save(self.params['composite_group_path']+'bailey_A.png')

        
    # edit composites (edge detect, brightness, saturation, colorize?)
    # combine composites (config A,B,C)
    def edge_detect(self,img):
        img = img.convert('L')
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.FIND_EDGES)
        return img

    def generate_composite(self, image_id):

        top_param = self.params['groups']['top'].split('_')
        bottom_param = self.params['groups']['bottom'].split('_')
        mask_param = self.params['groups']['mask'].split('_')

        # print(top_param,bottom_param,mask_param)

        top_source =    '../images//' + top_param[0]    + '//' + 'group_' + top_param[1] + '/'
        bottom_source = '../images//' + bottom_param[0] + '//' + 'group_' + bottom_param[1] + '/'
        mask_source =   '../images//' + mask_param[0]   + '//' + 'mask_'  + mask_param[1] + '/'

        # print(top_source,bottom_source,mask_source)

        top_group_names =     [f for f in listdir(top_source)    if isfile(join(top_source, f))]
        bottom_group_names =  [f for f in listdir(bottom_source) if isfile(join(bottom_source, f))]
        mask_group_names =    [f for f in listdir(mask_source)   if isfile(join(mask_source, f))]

        top_image_name =    random.choice(top_group_names)
        bottom_image_name = random.choice(bottom_group_names)
        mask_image_name =   random.choice(mask_group_names)

        # print(top_image_name,bottom_image_name,mask_image_name)

        top_image =         Image.open(top_source + top_image_name)
        bottom_image =      Image.open(bottom_source + bottom_image_name)
        mask =              Image.open(mask_source + mask_image_name)

        # print(top_image,bottom_image,mask)

        mask = self.change_contrast_multi(mask, [500])
        mask = mask.convert('L')
        final_img = Image.composite(bottom_image, top_image, mask)
        return final_img

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
manip.Initialize('composite_A')
manip.Generate()

# def main():







# change_contrast_multi(Image.open('../images//circle_MB//5.png'), [-100, 0, 100, 200, 300])




# # start process
# if __name__ == '__main__':
#     main()