import json
import os
import requests

messenger_access_token = os.environ.get('messenger_access_token')
messenger_access_token = "EAAC70o39wCcBAKZCmRwVtAHQIroZCEgBi5lHYOcpxf244v8rWVeDgjEfL23dZC3pNXECwPXecWloS2tceoxnX0fgkTrXG4DXOp2y8mZCVeamITNANqzgDAGX2ZCwUFosCHMZC8APRqDEjC0ZBMGaRzj8SgYbqnJUpQXcr4hS22g1QZDZD"


# send message fields
RECIPIENT_FIELD = 'recipient'
MESSAGE_FIELD = 'message'
ATTACHMENT_FIELD = 'attachment'
TYPE_FIELD = 'type'
TEMPLATE_TYPE_FIELD = 'template_type'
TEXT_FIELD = 'text'
TITLE_FIELD = 'title'
SUBTITLE_FIELD = 'subtitle'
IMAGE_FIELD = 'image_url'
BUTTONS_FIELD = 'buttons'
PAYLOAD_FIELD = 'payload'
URL_FIELD = 'url'
ELEMENTS_FIELD = 'elements'


class SendMessage:
    def __init__(self, recipient_id):
        #super().__init__()
        #self.receipient_type = Recipient.ID
        self.receipient_value = recipient_id
        self.message_data = None


    def getID(self):
        #receipient_value
        return self.receipient_value


    def send_message(self, message):
        if self.receipient_value is None:
            print("Please set the recipient!")
            return
        payload = {'recipient': {'id': self.receipient_value}, 'message': {"text": message}} # We're going to send this back
        r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + messenger_access_token, json=payload)
        print("POST response: " + str(r.json()))
        return


#send_carousel:  creates a carousel
#parameters: element_list is an array of elements

    def send_carousel(self, element_list):
        #create json of element
        part_nums = []

        #poplulate part_nums
        try:
          for element in element_list:
            part_nums.append({
                'title':str(element.getTitle()),
                'image_url':str(element.getImageUrl()),
                'subtitle':str(element.getSubTitle()),
                'buttons': element.button_list_to_array()
                })
        except Exception as e:
            print(e)

        bomb = {
           'recipient' : {'id': str(self.receipient_value)},
           'message' : {'attachment': {'type': 'template', 'payload': {'template_type': 'generic', 'elements': part_nums}}},
        }

        json_data = json.dumps(bomb)
        parsed_json  = json.loads(json_data)
        r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + messenger_access_token, json=parsed_json)
        print("POST response: " + str(r.json()))
        return

    #TODO: generics messages


    #sends a structured message with buttons, but not a scroll/view
    #send_buttons:  returns a sturcuted message with len(button_list) number of buttons
    #message = title of structured message
    #button_list = array of buttons
    #returns void, but posts to fb

    def send_gif(self, message):
        payload = {"recipient":{"id": str(self.receipient_value) },"message":{"attachment":{"type":"image","payload":{"url":"https://petersapparel.com/img/shirt.png"}}}}
        r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + messenger_access_token, json=payload)
        print("POST response: " + str(r.json()))
        return

    def send_video(self, message):
        pass

    def send_audio(seld, message):
        pass

    def send_buttons(self, message, button_list):
        buttonStrings = "["
        part_nums = []
        counter = 0

        try:
            for button in button_list:
                counter += 1

                if button.getURL() == True:

                  part_nums.append({'type':'web_url', 'url': str(button.getPayload()), 'title': str(button.getTitle())})
                else:
                  part_nums.append({'type':str(button.getType()), 'title': str(button.getTitle()), 'payload': str(button.getPayload())})

                  #jase = json.dumps(part_nums)

            bomb = {
               'recipient' : {'id': str(self.receipient_value)},
               'message' : {'attachment': {'type': 'template', 'payload': {'template_type': 'button', 'text': str(message), 'buttons': part_nums}}},

            }

            json_data = json.dumps(bomb)
            parsed_json  = json.loads(json_data)
            #r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + FB_TOKEN, json=json_data)
            r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + messenger_access_token, json=parsed_json)
            print("POST response: " + str(r.json()))
        except Exception as e:
            print(e)


        return

    #TODO: generics messages

#class element creates an object of type element which is defined in the facebook messenger api
#https://developers.facebook.com/docs/messenger-platform/send-api-reference


class Element:

    def __init__(self, title, image_url, subtitle, button_list):
      self.title = title
      self.image_url = image_url
      self.subtitle = subtitle
      self.button_list = button_list


    def getTitle(self):
      return self.title

    def getImageUrl(self):
      return self.image_url

    def getSubTitle(self):
      return self.subtitle

    def getButtonList(self):
      return self.button_list

    #button_list_to_array: returns the buttons as an array of json
    #parts_num, array of buttons in json form
    def button_list_to_array(self):

      part_nums = []

      for button in self.button_list:


        if button.getURL() == True:
          part_nums.append({'type':'web_url', 'url': str(button.getPayload()), 'title': str(button.getTitle())})
        else:
          part_nums.append({'type':str(button.getType()), 'title': str(button.getTitle()), 'payload': str(button.getPayload())})


      return part_nums

class Button:

    def __init__(self, btnType, title, payload, url):

        #payload or web_url
        self.type = btnType

        #name of button
        self.title = title

        #assign either payload or a url
        if url == "":
            self.payload = payload
            self.isURL = False
        else:
            self.payload = url
            self.isURL = True

    def getType(self):
        return self.type
    def getTitle(self):
        return self.title
    def getPayload(self):
        return self.payload
    def getURL(self):
        return self.isURL
