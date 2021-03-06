"""empty message

Revision ID: e9af3f9d8a18
Revises: None
Create Date: 2016-05-23 01:25:57.519047

"""

# revision identifiers, used by Alembic.
revision = 'e9af3f9d8a18'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('playlist',
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('song',
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('artist', sa.String(), nullable=True),
    sa.Column('spotify_id', sa.String(), nullable=True),
    sa.Column('youtube_url', sa.String(), nullable=True),
    sa.Column('google_music_id', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_song',
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlist.id'], ),
    sa.ForeignKeyConstraint(['song_id'], ['song.id'], ),
    sa.PrimaryKeyConstraint('playlist_id', 'song_id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlist_song')
    op.drop_table('song')
    op.drop_table('playlist')
    ### end Alembic commands ###
