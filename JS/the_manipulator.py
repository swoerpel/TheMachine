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
            composite_image_name = 'single_'
            composite_image_name += str(round(random.random() * 1000000))
            composite_image = self.generate_composite(composite_image_name)
            self.im_width = composite_image.size[0]
            self.im_height = composite_image.size[1]
            if self.params['options']['edge_detect']:
                composite_image = self.enhance_edges(composite_image)

            full_path = self.params['composite_group_path'] + composite_image_name + '.png'
            print('Saving image at ',full_path)
            composite_image.save(full_path)


        elif self.params['mode'] == 'group':
            composite_images = []
            index = 0
            image_name = 'group_' 
            image_name += self.path_params[1] + '_' 
            image_name +=str(round(random.random() * 1000000)) + '_'
            for i in range(self.params['layout'][0]):
                for j in range(self.params['layout'][1]):
                    print('generating image',str(index + 1))
                    composite_images.append(self.generate_composite(image_name + str(index) + '.png'))
                    index += 1

            self.im_width = composite_images[0].size[0]
            self.im_height = composite_images[0].size[1]
            composite_group_width = self.im_width * self.params['layout'][0]
            composite_group_height = self.im_height * self.params['layout'][1]
            composite_group = Image.new('RGBA', (composite_group_width, composite_group_height))
            index = 0
            for i in range(self.params['layout'][0]):
                for j in range(self.params['layout'][1]):
                    print('combining image',str(index + 1), 'to group')
                    im = composite_images[index]
                    composite_group.paste(im, (self.im_width * i, self.im_height * j))
                    index += 1

            if self.params['options']['edge_detect']:
                composite_group = self.edge_detect(composite_group)
            full_path = self.params['composite_group_path'] + image_name + 'final.png'
            print('Saving image at ',full_path)
            composite_group.save(full_path)

                     # im = self.edge_detect(self.composite_images[i])
        #         # im = ImageOps.invert(im)


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

        # mask = self.change_contrast_multi(mask, [500])
        mask = mask.convert('L')
        enhancer= ImageEnhance.Contrast(mask)
        # mask = enhancer.enhance(4.0)
        final_img = Image.composite(bottom_image, top_image, mask)
        return final_img

    # edit composites (edge detect, brightness, saturation, colorize?)
    # combine composites (config A,B,C)
    def enhance_edges(self,image):
        img = copy.copy(image)
        img = img.convert('L')

        # img = img.filter(ImageFilter.FIND_EDGES)

        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        img = img.filter(ImageFilter.FIND_EDGES)
        th = 155 # the value has to be adjusted for an image of interest 
        img = img.point(lambda i: i < th and 255)
        # datas = img.getdata()
        # print(datas)
        # for item in datas:
        #     print('item',item)
        #     if item[0] == 255 and item[1] == 255 and item[2] == 255:
        #         newData.append((255, 255, 255, 0))
        #     else:
        #         newData.append((0,0,0,255))
        # img.putdata(newData)
        return Image.alpha_composite(image, img)
        # img = img.convert("RGBA")
        # datas = list(img.getdata())

        # newData = []
        # grid = np.zeros((self.im_width,self.im_height))
        # # print(datas)

        # index = 0
        # grid = []
        # for i in range(self.im_height):
        #     row = []
        #     for j in range(self.im_width):
        #         row.append(datas[index])
        #         index += 1
        #     grid.append(row)

        # for i in range(self.im_width):
        #     for j in range(self.im_height):
        #             item = grid[i][j]
        #             if item[0] == 255 and item[1] == 255 and item[2] == 255: # if black
        #                 grid[i][j] = (255, 255, 255, 0) # transparent
        #             else: # color area white
        #                 grid[i][j] = (0,0,0,255)
        #                 grid[(i + 1) % self.im_width][(j)     % self.im_height] = (0,0,0,255)
        #                 grid[(i)     % self.im_width][(j + 1) % self.im_height] = (0,0,0,255)
        #                 grid[(i - 1) % self.im_width][(j)     % self.im_height] = (0,0,0,255)
        #                 grid[(i)     % self.im_width][(j - 1) % self.im_height] = (0,0,0,255)

        # for item in datas:
        #     if item[0] == 255 and item[1] == 255 and item[2] == 255:
        #         newData.append((255, 255, 255, 0))
        #     else:
        #         newData.append((0,0,0,255))
        # grid = np.array(grid).flatten()
        # img.putdata(grid.flatten())
        



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

# def main():







# change_contrast_multi(Image.open('../images//circle_MB//5.png'), [-100, 0, 100, 200, 300])




# # start process
# if __name__ == '__main__':
#     main()