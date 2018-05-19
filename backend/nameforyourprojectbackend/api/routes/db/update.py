from django.http import JsonResponse
from api.models.recording import Recording
from api.models.clip import Clip

import pandas as pd
import json

def update(request):

    print(request)
    if request.POST:
        csvfile = request.FILES['csv_file']
        # dialect = csv.Sniffer().sniff(codecs.EncodedFile(csvfile, "utf-8").read(1024))
        # csvfile.open()
        # reader = csv.reader(codecs.EncodedFile(csvfile, "utf-8"), delimiter=',', dialect=dialect)
        print(csvfile)
        df = pd.read_csv(csvfile, encoding = "utf8")
        data = {"data": []}
        
        for _, row in df.iterrows():
            data["data"].append(json.loads(row.to_json()))	# json.loads accepts a string json object so serialize each row first

        print(data)
        populate_clip_table(data)


    return JsonResponse({
        "success": True,
    })


def populate_clip_table(data):

	for clip in data["data"]:

		try:
			recording = Recording.objects.get(recording_filename=clip["WAV"].lower())

			# clip already exists, update existing clip
			if Clip.objects.filter(clip_filename=clip["File"]).exists():
				clip_object = Clip.objects.filter(clip_filename=clip["File"])
				clip_object.clip_filename=clip["File"]
				clip_object.clip_filename=clip["File"],
				clip_object.clip_recording=clip["WAV"],
				clip_object.broad=clip["Broad"],
				clip_object.ortho=clip["Ortho"],
				clip_object.new_ortho=clip["NewOrtho"],
				clip_object.phonetic=clip["Phonetic"],
				clip_object.utt_gloss=clip["UttGloss"],
				clip_object.spanish=clip["Spanish"],
				clip_object.english=clip["English"],
				clip_object.start_ms=clip["start_ms"],
				clip_object.recording=recording,
				clip_object.path='http://yoursite.com' + settings.MEDIA_URL + clip['WAV'][:2] + '/' + clip['WAV'].split('.')[0] + '/clips/' + clip['File']
			else:

				# create new clip
				clip_object = Clip(
					clip_filename=clip["File"],
					clip_recording=clip["WAV"],
					broad=clip["Broad"],
					ortho=clip["Ortho"],
					new_ortho=clip["NewOrtho"],
					phonetic=clip["Phonetic"],
					utt_gloss=clip["UttGloss"],
					spanish=clip["Spanish"],
					english=clip["English"],
					start_ms=clip["start_ms"],
					recording=recording,
					path='http://yoursite.com' + settings.MEDIA_URL + clip['WAV'][:2] + '/' + clip['WAV'].split('.')[0] + '/clips/' + clip['File']
				)

			clip_object.save()

		except ObjectDoesNotExist:
			continue

    # HTTP_400_BAD_REQUEST
#
# def populate_database(request):
#
# 	populate_speakers_table()
# 	populate_recordings_table()
# 	populate_clip_table()
#
# 	# update_column()
#
# 	return JsonResponse({
# 		"success": True,
# 	})
#
#
#
# def get_clip_data():
# 	# read in csv file into a pandas dataframe, use appropriate encoding if error occurs
# 	df = pd.read_csv(os.path.dirname(os.path.realpath(__file__)) + '/clip_metadata.csv', encoding = "utf8")
# 	data = {"data": []}
#
# 	for index, row in df.iterrows():
# 		data["data"].append(json.loads(row.to_json()))	# json.loads accepts a string json object so serialize each row first
#
# 	return data
#
#
# def update_column():
#
# 	# get clips by filename and then fill in start_ms
# 	clip_data = get_clip_data()
# 	for row in clip_data["data"]:
#
# 		try:
# 			clip = Clip.objects.get(clip_filename=row["File"])
# 			clip.path = 'http://yoursite.com' + settings.MEDIA_URL + row['WAV'][:2] + '/' + row['WAV'].split('.')[0] + '/clips/' + row['File']
# 			clip.save()
#
# 		except ObjectDoesNotExist:
# 			continue
#
#
# def get_recording_data():
# 	recordings_file = pd.ExcelFile(os.path.dirname(os.path.realpath(__file__)) + '/metadata_nameforyourprojectbackend_2014.xls', encoding="utf8")
# 	df = recordings_file.parse("Metadata") # get Metadata sheet for all recordings
# 	data = {"data": []}
#
# 	for index, row in df.iterrows():
# 		data["data"].append(json.loads(row.to_json()))	# json.loads accepts a string json object so serialize each row first
#
# 	return data
#
#
# prefixes = ["el", "tr", "te", "mu"]
#
# # e.g. tx_muerta.wav is valid file
# # el_muerta is invalid file
# # tx128.wav is valid file
# # el128.wav is not valid file
# def is_valid_file(filename):
# 	for p in prefixes:
# 		if p == filename[0:2]:
# 			return False
# 	return True
#
#
# def is_valid_recording(row):
# 	if row["Format"] is not None and row["Format"] == "wav":
# 		if row['Title'] is not None and "Word prosody" not in row['Title'] and is_valid_file(row['File']):
# 			return True
# 	return False
#
#
# # when adding a recording
# def check_duplicate_recording():
# 	pass
#
#
# def populate_recordings_table():
#
# 	data = get_recording_data()
#
# 	for row in data["data"]:
#
# 		if is_valid_recording(row):
#
# 			filename = row['File'] + '.' + row['Format']
#
# 			if Recording.objects.filter(recording_filename=filename).exists():
# 				# print("%s already exists" % row["Title"])
# 				continue
#
# 			recording = Recording(
# 				recording_filename=filename,
# 				story_name=row["Title"],
# 				description=row['Description'],
# 				date_recorded=row['Date recorded'],
# 			)
#
# 			# print("SAVING YAHH YAY " + filename)
#
# 			recording.save()
#
# 			speaker_initials = row["Contributor"].replace(" ", "").split(',')
#
# 			for initial in speaker_initials:
# 				speaker = Speaker.objects.get(speaker_initials=initial) # should only return one
# 				recording.speakers.add(speaker)
#
#
# def populate_speakers_table():
#
# 	people_file = pd.ExcelFile(os.path.dirname(os.path.realpath(__file__)) + '/metadata_nameforyourprojectbackend_2014.xls', encoding="utf8")
# 	df = people_file.parse("People") # get People sheet for all speakers
#
# 	data = {"data": []}
#
# 	recording_data = get_recording_data()
#
# 	for index, row in df.iterrows():
# 		data["data"].append(json.loads(row.to_json()))	# json.loads accepts a string json object so serialize each row first
#
# 	for speaker in data["data"]:
# 		speaker = Speaker.objects.create(
# 			speaker_initials=speaker['ID'],
# 			speaker_name=speaker["Name"],
# 		)
#
# def populate_clip_table():
#
# 	data = get_clip_data()
#
# 	for clip in data["data"]:
#
# 		try:
# 			recording = Recording.objects.get(recording_filename=clip["WAV"].lower())
#
# 			if Clip.objects.filter(clip_filename=clip["File"]).exists():
# 				continue
#
# 			clip_object = Clip(
# 				clip_filename=clip["File"],
# 				clip_recording=clip["WAV"],
# 				broad=clip["Broad"],
# 				ortho=clip["Ortho"],
# 				new_ortho=clip["NewOrtho"],
# 				phonetic=clip["Phonetic"],
# 				utt_gloss=clip["UttGloss"],
# 				spanish=clip["Spanish"],
# 				english=clip["English"],
# 				start_ms=clip["start_ms"],
# 				recording=recording,
# 				path='http://yoursite.com' + settings.MEDIA_URL + clip['WAV'][:2] + '/' + clip['WAV'].split('.')[0] + '/clips/' + clip['File']
# 			)
#
# 			clip_object.save()
#
# 		except ObjectDoesNotExist:
# 			continue
