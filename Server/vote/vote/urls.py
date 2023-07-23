from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('vote/create/', VoteContextCreate.as_view(), name='create_vote_context'),
    path('login/', Login.as_view(), name='login'),
    path('poll/statistic/1/<int:pk>', RetrieveVoteContextStatistic1.as_view(), name="get_vote_context_statistic_1"),
    path('poll/list', VoteContextListPersonal.as_view(), name='get_personal_vote_context'),
    path('pollInfo/', VoteContextList.as_view(), name="get_all_vote_context"),
    path('poll/delete/<int:pk>', VoteContextDelete.as_view(), name='destroy_vote_context'),
    path('poll/detail/<int:pk>', VoteContextRetrieve.as_view(), name='retrieve_vote_context'),
    path('poll/edit/<int:pk>', VoteContextUpdate.as_view(), name='update_vote_context'),
    path('vote/', VoteUpdate.as_view(), name='update_vote'),
]
