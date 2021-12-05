##here question data is retrive from the website  https://iqtestpreparation.com/number-patterns using webscraping tools of python Beautifulsoap.

from bs4 import BeautifulSoup
import requests
import numpy as np # this used for numerical computing
import json 

URL = "https://iqtestpreparation.com/number-patterns"

r = requests.get(URL)
soup = BeautifulSoup(r.text, "html.parser") # data is retrive in html format form URL
class QueApi:
    # listed that data of div which have class (_tab)
    data_list = soup.find_all("div", class_='tab')

    # listed that data of label which have class (eze_check)
    option_data = soup.find_all("label", class_='eze_check')

    # this convert the data in Json format 
    def queJson(self, Questions):
        # Serializing json  
        json_que = json.dumps(Questions, indent = 4)
        return json_que

    # Options of Question is retrive in listed form
    def options(self,option_data):
        option_list = []
        for opt in option_data:
            options = opt.text
            options = " ".join(options.split())
            option_list.append(options)
        option_list=np.reshape(option_list, (113, 4))
        option_list=option_list.tolist()
        return option_list

    # Answer of Question is retrive in listed form
    def answers(self):
        i = 1
        ans_l = []
        for k in range(1,114):
            id = f"qod_correct_opt_{i}"
            ans = soup.find('input', {'id': id}).get('value')
            ans_l.append(ans)
            i +=1
        return ans_l

    # here all question data are retrive
    def questionList(self):
        option_list = self.options(self.option_data)
        ans_l = self.answers()
        Questions = []
        index = 0
        for data in self.data_list:
            que_data = {}
            if data.find(class_='question_heading'): # find the question heading 
                que_heading = data.find(class_='question_heading').text
            if data.find(class_='question_text'): # find the question
                post_que = data.find(class_='question_text').text.replace('\n','')
            if data.find(class_='question_heading'): # find the solution of question
                solution = data.find(class_='alert alert-info qod_solu').text.replace('Solution!','').replace('\n','')
            
            #data is  reformting in sentence form
            que_heading = " ".join(que_heading.split()) 
            post_que = " ".join(post_que.split())
            solution = " ".join(solution.split())

            #data is add in que_data dic
            que_data['Qno'] = que_heading
            que_data['QUE'] = post_que
            que_data['OPT'] = option_list[index]
            que_data['ANS'] = ans_l[index]
            que_data['SOL'] = solution
            Questions.append(que_data) # finally data are add to listed named Question
            index +=1
        return self.queJson(Questions) # this will used method queJson for reformating data in Json formate.

