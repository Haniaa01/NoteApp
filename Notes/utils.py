from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
from rest_framework import status


def getNotesList(request):
    user = request.user
    notes = user.note_set.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


def getNoteDetail(request, pk):
    user = request.user
    notes = user.note_set.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


def createNote(request):
    user = request.user
    data = request.data
    note = user.note_set.create(
    body=data['body'],
    user=user
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

def updateNote(request, pk):
    user = request.user
    try:
        note = user.note_set.get(id=pk)
    except Note.DoesNotExist:
        return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = NoteSerializer(instance=note, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def deleteNote(request, pk):
    user = request.user
    note = user.note_set.get(id=pk)
    note.delete()
    return Response('Note was deleted!')