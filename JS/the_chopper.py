import sys
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageEnhance
from os import listdir
from os.path import isfile, join
import random
import json
import copy
import numpy as np


class Chopper:

    def __init__(self):
        print('VROOM VROOM goes the chopper')
        with open('config_chopper.json') as json_data_file:
            self.config = json.load(json_data_file)
        print(self.config)
        self.params = self.config['params']

    def Chop(self):
        for i in range(self.params['chop_count']):
            chop = self.generate_chopped_image()
            path = self.params['def_path'] + self.params['output_folder']
            chop_name = 'chop' + str(i + 1) + '.png'
            chop.save(path + chop_name, "PNG")


    def generate_chopped_image(self):
        # open image for chopping
        self.image = Image.open(self.params['def_path'] + self.params['image_folder'] + self.params['image_name'])
        self.width, self.height = self.image.size
        
        print('image size ->',self.width,self.height)

        self.chop_width = self.width * self.params['chop_dims'][0]
        self.chop_height = self.height * self.params['chop_dims'][1]

        print('chop size ->', self.chop_width, self.chop_height)

        bound_radius = np.sqrt(np.power(self.chop_width,2) + np.power(self.chop_height,2)) * 0.5
        bound_radius = round(bound_radius,-2)


        print('boundary radius ->', bound_radius)
        origin_domain = [bound_radius, self.width - bound_radius]
        origin_range  = [bound_radius, self.height - bound_radius]
        print('origin domain', origin_domain)
        print('origin range', origin_range)
        origin_x = random.randint(origin_domain[0], origin_domain[1])
        origin_y = random.randint(origin_range[0], origin_range[1])
        print('origin x', origin_x)
        print('origin y', origin_y)
        # origin_x = self.width / 2
        # origin_y = self.height / 2
        bound_box = [origin_x - bound_radius, origin_y - bound_radius, origin_x + bound_radius, origin_y + bound_radius]
        bound_box = [round(bound_box[i],-1) for i in range(len(bound_box))]
        print('bound box',bound_box)

        chop_box = []
        chop_box.append(origin_x - self.chop_width / 2)
        chop_box.append(origin_y - self.chop_height / 2)
        chop_box.append(origin_x + self.chop_width / 2)
        chop_box.append(origin_y + self.chop_height / 2)
        print('chop box', chop_box)

        angle = random.randint(0,90)
        chop = self.image.rotate((angle / 5) * angle, center=(origin_x,origin_y))

        #saving chop location
        # self.image = self.image.rotate(45, center=(origin_x,origin_y))
        # draw = ImageDraw.Draw(self.image)
        # draw.ellipse(bound_box,'white')
        # draw.rectangle(chop_box,'black')
        # path = self.params['def_path'] + self.params['output_folder']
        # img_name = 'chop.png'
        # self.image.save(path + img_name, "PNG")


        return chop.crop(chop_box)
        # self.image = self.image.rotate(45, center=(origin_x,origin_y))

        # chop_1 = self.image.crop(chop_box)
        # chop_1.show()
        # draw = ImageDraw.Draw(self.image)
        # draw.ellipse(bound_box,'white')
        # draw.rectangle(chop_box,'black')
        # del draw

        # for i in range(self.params.chop_count):
        #     chop_name = 'chop_' + str(i + 1) + '.png'
        #     chop = 


        



# select chop size (x,y) -> 0.0...1.0, certain percentage of original
# calculate chop origin boundary box
# select random origin in boundary box
# calculate base chop corner locations
# select random rotation value (0,45,90)
# calculate rotated chop corner locations

# crop image options
    # A: crop rotated rect using coordinates
    # B: rotate image about chop origin 
    #    -> crop default box orientation


c = Chopper()
c.Chop()
