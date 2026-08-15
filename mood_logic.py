import random

data = {
    "happy": {
        "affirmations": ["You're radiating good energy today.", "This joy looks amazing on you."],
        "quotes": ["Keep shining, the world needs your light.", "Happiness looks good on you!", "Joy shared is joy doubled."],
        "activities": ["Share your good mood with a friend.", "Dance to your favorite song.", "Take a goofy selfie and smile big."],
        "songs": ["Happy - Pharrell Williams", "Good as Hell - Lizzo", "Walking on Sunshine - Katrina & The Waves"],
        "movies": ["The Intouchables", "Paddington 2", "Sing Street"]
    },
    "sad": {
        "affirmations": ["Your feelings are valid, and this moment will pass.", "Be as gentle with yourself as you would with a friend."],
        "quotes": ["This too shall pass.", "It's okay to not be okay sometimes.", "Even the darkest night will end and the sun will rise."],
        "activities": ["Write down 3 things you're grateful for.", "Take a slow walk outside.", "Wrap yourself in a blanket and have some tea."],
        "songs": ["Fix You - Coldplay", "Here Comes the Sun - The Beatles", "Better Days - OneRepublic"],
        "movies": ["Inside Out", "The Pursuit of Happyness", "A Silent Voice"]
    },
    "stressed": {
        "affirmations": ["You've handled hard things before — you can handle this too.", "One task at a time is enough."],
        "quotes": ["Breathe. You've survived worse than this.", "One step at a time.", "Calm mind brings inner strength."],
        "activities": ["Try 5 minutes of deep breathing.", "Stretch for 2 minutes.", "Make a short list and tackle just one thing."],
        "songs": ["Weightless - Marconi Union", "Circles - Post Malone", "Breathe - Telepopmusik"],
        "movies": ["Soul", "The Secret Life of Walter Mitty", "My Neighbor Totoro"]
    },
    "bored": {
        "affirmations": ["Boredom is just your brain asking for something new.", "A little curiosity can turn this around fast."],
        "quotes": ["Boredom is the birthplace of creativity.", "Do something new today.", "An idle mind is a canvas waiting for color."],
        "activities": ["Learn 3 words in a new language.", "Sketch anything for 5 minutes.", "Rearrange one small corner of your room."],
        "songs": ["Uptown Funk - Bruno Mars", "Blinding Lights - The Weeknd", "Feel Good Inc. - Gorillaz"],
        "movies": ["Zombieland", "Scott Pilgrim vs. the World", "The Grand Budapest Hotel"]
    },
    "angry": {
        "affirmations": ["This feeling is valid, but it doesn't get to drive.", "You are in control, not the anger."],
        "quotes": ["Anger is one letter short of danger.", "Pause before you react.", "Speak when you are calm, not when you are angry."],
        "activities": ["Take 10 deep breaths.", "Go for a quick walk to cool off.", "Squeeze a pillow or do 10 pushups to release it."],
        "songs": ["Let It Go - Idina Menzel", "Breathe Me - Sia", "Titanium - David Guetta ft. Sia"],
        "movies": ["Kung Fu Panda", "School of Rock", "Ratatouille"]
    }
}


def get_recommendation(mood):
    mood = mood.lower().strip()
    if mood not in data:
        return None
    entry = data[mood]
    return {
        "affirmation": random.choice(entry["affirmations"]),
        "quote": random.choice(entry["quotes"]),
        "activity": random.choice(entry["activities"]),
        "song": random.choice(entry["songs"]),
        "movie": random.choice(entry["movies"])
    }


if __name__ == "__main__":
    mood = input("How are you feeling? (happy/sad/stressed/bored/angry): ")
    rec = get_recommendation(mood)
    if rec:
        print(f"\n✨ {rec['affirmation']}")
        print(f"Quote: {rec['quote']}")
        print(f"Activity: {rec['activity']}")
        print(f"Song: {rec['song']}")
        print(f"Movie: {rec['movie']}")
    else:
        print("Mood not recognized. Try happy, sad, stressed, bored, or angry.")
